/**
 * Базовый HTTP-клиент для работы с REST API
 * Base URL: http://5.129.208.73:5000
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import { mockRequest } from './mock/mockApi';

export const BASE_URL = 'http://5.129.208.73:5000';

// Mock-режим для разработки без бэкенда: EXPO_PUBLIC_API_MOCK=1 в .env.local
const USE_MOCK_API = process.env.EXPO_PUBLIC_API_MOCK === '1';

if (USE_MOCK_API) {
  console.warn('[api] Включён mock-режим: запросы к бэкенду не отправляются');
}

// Ключи SecureStore: допустимы только буквы, цифры, '.', '-', '_'
const TOKEN_KEYS = {
  ACCESS: 'questcity_access_token',
  REFRESH: 'questcity_refresh_token',
} as const;

// Ключи, под которыми токены хранились в AsyncStorage до перехода на SecureStore
const LEGACY_TOKEN_KEYS = {
  ACCESS: '@questcity_access_token',
  REFRESH: '@questcity_refresh_token',
} as const;

// ─── Управление токенами ────────────────────────────────────────────────────

let legacyMigration: Promise<void> | null = null;

/** Однократно переносит токены из AsyncStorage в SecureStore и удаляет их из AsyncStorage */
function migrateLegacyTokens(): Promise<void> {
  if (!legacyMigration) {
    legacyMigration = (async () => {
      const [accessToken, refreshToken] = await Promise.all([
        AsyncStorage.getItem(LEGACY_TOKEN_KEYS.ACCESS),
        AsyncStorage.getItem(LEGACY_TOKEN_KEYS.REFRESH),
      ]);
      if (!accessToken) return;
      await saveTokens(accessToken, refreshToken);
      await AsyncStorage.multiRemove([
        LEGACY_TOKEN_KEYS.ACCESS,
        LEGACY_TOKEN_KEYS.REFRESH,
      ]);
    })();
  }
  return legacyMigration;
}

export async function getAccessToken(): Promise<string | null> {
  await migrateLegacyTokens();
  return SecureStore.getItemAsync(TOKEN_KEYS.ACCESS);
}

export async function getRefreshToken(): Promise<string | null> {
  await migrateLegacyTokens();
  return SecureStore.getItemAsync(TOKEN_KEYS.REFRESH);
}

export async function saveTokens(
  accessToken: string,
  refreshToken: string | null,
): Promise<void> {
  const promises = [SecureStore.setItemAsync(TOKEN_KEYS.ACCESS, accessToken)];
  if (refreshToken) {
    promises.push(SecureStore.setItemAsync(TOKEN_KEYS.REFRESH, refreshToken));
  } else {
    promises.push(SecureStore.deleteItemAsync(TOKEN_KEYS.REFRESH));
  }
  await Promise.all(promises);
}

export async function clearTokens(): Promise<void> {
  await Promise.all([
    SecureStore.deleteItemAsync(TOKEN_KEYS.ACCESS),
    SecureStore.deleteItemAsync(TOKEN_KEYS.REFRESH),
  ]);
}

// ─── Refresh логика ─────────────────────────────────────────────────────────

let isRefreshing = false;
let refreshQueue: ((token: string | null) => void)[] = [];

async function runRefresh(): Promise<string | null> {
  const refreshToken = await getRefreshToken();
  if (!refreshToken) return null;

  try {
    const res = await fetch(`${BASE_URL}/api/Auth/token-refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      await clearTokens();
      return null;
    }

    const data: { accessToken: string; refreshToken: string } =
      await res.json();
    await saveTokens(data.accessToken, data.refreshToken);
    return data.accessToken;
  } catch {
    await clearTokens();
    return null;
  }
}

async function refreshAccessToken(): Promise<string | null> {
  if (isRefreshing) {
    return new Promise((resolve) => {
      refreshQueue.push(resolve);
    });
  }

  isRefreshing = true;
  const newToken = await runRefresh();
  isRefreshing = false;

  refreshQueue.forEach((cb) => cb(newToken));
  refreshQueue = [];

  return newToken;
}

// ─── Основной запрос ────────────────────────────────────────────────────────

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  retry = true,
): Promise<T> {
  if (USE_MOCK_API) {
    const mock = await mockRequest(method, path, body);
    if (mock.status >= 400) {
      throw new ApiError(mock.status, `HTTP ${mock.status} (mock)`);
    }
    return mock.body as T;
  }

  const accessToken = await getAccessToken();

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (accessToken) {
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  const isAuthEndpoint =
    path.includes('/Auth/session-authenticate') ||
    path.includes('/Auth/token-refresh') ||
    path.includes('/Auth/user_create');

  // Автоматический refresh при 401
  if (res.status === 401 && retry && !isAuthEndpoint) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      return request<T>(method, path, body, false);
    }
  }

  if (!res.ok) {
    let message = res.status === 401 ? 'Не авторизован' : `HTTP ${res.status}`;
    try {
      const text = await res.text();
      console.log(`[API Error] ${method} ${path} -> ${res.status}:`, text);
      try {
        const err = JSON.parse(text);
        message =
          err.message ??
          err.detail ??
          err.title ??
          (typeof err === 'string' ? err : message);
      } catch {
        // Fallback to plain text if not empty
        if (text && text.trim()) {
          message = text;
        }
      }
    } catch (e) {
      console.log(`[API Error Parse Failed]`, e);
    }
    throw new ApiError(res.status, message);
  }

  // Для пустых ответов (204 No Content)
  if (res.status === 204) {
    return undefined as unknown as T;
  }

  return res.json() as Promise<T>;
}

// ─── Публичный API-клиент ───────────────────────────────────────────────────

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body: unknown) => request<T>('POST', path, body),
  put: <T>(path: string, body: unknown) => request<T>('PUT', path, body),
  delete: <T>(path: string) => request<T>('DELETE', path),
};

// ─── Ошибка API ─────────────────────────────────────────────────────────────

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
