import { useState } from 'react';
import { useStore } from '@/store';
import {
  useGetUserQuery,
  useCreateUserMutation,
  useLoginUserMutation,
} from '@/services/apollo/gql/operations';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser } = useStore();

  // Apollo хуки
  const {
    data: userData,
    loading: userLoading,
    error: userError,
  } = useGetUserQuery();
  const [createUser, { loading: createLoading }] = useCreateUserMutation();
  const [loginUser, { loading: loginLoading }] = useLoginUserMutation();

  const login = async (login: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await loginUser({
        variables: { login, password },
      });

      if (data?.loginUser) {
        // Сохраняем токены
        await AsyncStorage.setItem('token', data.loginUser.accessToken);
        if (data.loginUser.refreshToken) {
          await AsyncStorage.setItem(
            'refreshToken',
            data.loginUser.refreshToken
          );
        }

        // Обновляем пользователя в store
        if (userData?.userByToken) {
          setUser(userData.userByToken);
        }

        return data.loginUser;
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка входа';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await createUser({
        variables: {
          user: { username, email, password },
        },
      });

      if (data?.createUser) {
        // Сохраняем токены
        await AsyncStorage.setItem('token', data.createUser.accessToken);
        if (data.createUser.refreshToken) {
          await AsyncStorage.setItem(
            'refreshToken',
            data.createUser.refreshToken
          );
        }

        // Обновляем пользователя в store
        if (userData?.userByToken) {
          setUser(userData.userByToken);
        }

        return data.createUser;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Ошибка регистрации';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Удаляем токены
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('refreshToken');
      setUser(null);
    } catch (err) {
      console.error('Error during logout:', err);
    }
  };

  // Обновляем пользователя в store при изменении данных
  if (userData?.userByToken) {
    setUser(userData.userByToken);
  }

  return {
    loading: loading || userLoading || createLoading || loginLoading,
    error: error || userError?.message,
    user: userData?.userByToken,
    login,
    register,
    logout,
  };
};
