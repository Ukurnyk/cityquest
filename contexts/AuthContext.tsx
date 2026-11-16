/**
 * Контекст авторизации
 * Хранит токены и профиль пользователя, управляет сессией.
 */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { getAccessToken, getRefreshToken } from '../services/api';
import {
  login as apiLogin,
  logout as apiLogout,
  register as apiRegister,
} from '../services/authService';
import { getCurrentUser } from '../services/userService';
import { ApiUser } from '../types';

// ─── Типы ────────────────────────────────────────────────────────────────────

interface AuthState {
  user: ApiUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (loginStr: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
  reloadUser: () => Promise<void>;
}

// ─── Контекст ────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue | null>(null);

// ─── Провайдер ───────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /** Загрузить профиль (если есть токен) */
  const reloadUser = useCallback(async () => {
    try {
      const profile = await getCurrentUser();
      setUser(profile);
    } catch {
      setUser(null);
    }
  }, []);

  /** Проверить токен при старте приложения */
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const token = await getAccessToken();
      if (token) {
        await reloadUser();
      }
      setIsLoading(false);
    })();
  }, [reloadUser]);

  const login = useCallback(
    async (loginStr: string, password: string) => {
      await apiLogin(loginStr, password);
      await reloadUser();
    },
    [reloadUser],
  );

  const register = useCallback(
    async (username: string, email: string, password: string) => {
      await apiRegister(username, email, password);
      await reloadUser();
    },
    [reloadUser],
  );

  const logout = useCallback(async () => {
    const refreshToken = await getRefreshToken();
    await apiLogout(refreshToken ?? '');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        reloadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ─── Хук ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
