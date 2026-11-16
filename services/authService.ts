/**
 * Сервис авторизации
 * Эндпоинты: /api/Auth/*, /api/Users/user_create
 */
import { ApiUser, TokenPair } from '../types';
import { api, clearTokens, saveTokens } from './api';

export interface LoginRequest {
  login: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

/**
 * Войти в систему.
 * Сохраняет токены в AsyncStorage.
 */
export async function login(
  login: string,
  password: string,
): Promise<TokenPair> {
  const tokens = await api.post<TokenPair>('/api/Auth/session-authenticate', {
    login,
    password,
  });
  await saveTokens(tokens.accessToken, tokens.refreshToken);
  return tokens;
}

/**
 * Зарегистрировать нового пользователя.
 * После регистрации автоматически выполняет логин.
 */
export async function register(
  username: string,
  email: string,
  password: string,
): Promise<TokenPair> {
  await api.post<ApiUser>('/api/Auth/user_create', {
    username,
    email,
    password,
  });
  return login(username, password);
}

/**
 * Выйти из системы.
 */
export async function logout(refreshToken: string): Promise<void> {
  try {
    await api.post<void>('/api/Auth/session-logout', { refreshToken });
  } catch {
    // Игнорируем ошибки — всё равно чистим токены
  } finally {
    await clearTokens();
  }
}
