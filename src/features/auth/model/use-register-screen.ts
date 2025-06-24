import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  useCreateUserMutation,
  useGetUserQuery,
} from '@/services/apollo/gql/operations';
import { apolloClient } from '@/services/apollo/client';
import { useStore } from '@/store';
import { RootStackParamList } from '@/types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface RegisterData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const useRegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [error, setError] = useState<string | null>(null);
  const [createUser, { loading }] = useCreateUserMutation();
  const { refetch: refetchUser } = useGetUserQuery();

  const handleRegister = async (data: RegisterData) => {
    setError(null);
    try {
      const { data: response } = await createUser({
        variables: {
          user: {
            username: data.username,
            email: data.email,
            password: data.password,
          },
        },
      });
      if (response?.createUser) {
        await useStore.getState().setToken(response.createUser.accessToken);
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
      setError(err instanceof Error ? err.message : 'Ошибка при регистрации');
    }
  };

  return {
    handleRegister,
    loading,
    error,
  };
};
