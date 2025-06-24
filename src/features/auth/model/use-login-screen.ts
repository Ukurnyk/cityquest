import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  useLoginUserMutation,
  useGetUserQuery,
} from '@/services/apollo/gql/operations';
import { useStore } from '@/store';
import { RootStackParamList } from '@/types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface LoginData {
  login: string;
  password: string;
}

export const useLoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [error, setError] = useState<string | null>(null);
  const [loginUser, { loading }] = useLoginUserMutation();
  const { refetch: refetchUser } = useGetUserQuery();

  const handleLogin = async (data: LoginData) => {
    setError(null);
    try {
      const { data: response } = await loginUser({
        variables: {
          login: data.login,
          password: data.password,
        },
      });
      if (response?.loginUser) {
        await useStore.getState().setToken(response.loginUser.accessToken);
        // Обновляем данные пользователя
        const userRes = await refetchUser();
        const user = userRes.data?.userByToken;
        if (user) {
          useStore.getState().setUser({
            id: user.id,
            username: user.username,
            email: user.email,
          });
        }
        navigation.replace('Main');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при входе');
    }
  };

  return {
    handleLogin,
    loading,
    error,
  };
};
