import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '@/presentation/theme';
import { authStyles } from './styles';
import { useLoginUserMutation, GetUserDocument } from '@/gql/operations';
import { client } from '@/api/client';
import { useStore } from '@/store';
import { useForm, Controller } from 'react-hook-form';
import { RootStackParamList } from '@/types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [error, setError] = React.useState<string | null>(null);
  const [loginUser, { loading }] = useLoginUserMutation();

  type FormData = { login: string; password: string };
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<FormData>({
    defaultValues: { login: '', password: '' },
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    if (!data.login || !data.password) {
      setFormError('login', { message: 'Введите логин' });
      setFormError('password', { message: 'Введите пароль' });
      return;
    }
    try {
      const { data: resp } = await loginUser({
        variables: { login: data.login, password: data.password },
      });
      if (resp?.loginUser) {
        await useStore.getState().setToken(resp.loginUser.accessToken);
        const userRes = await client.query({
          query: GetUserDocument,
          fetchPolicy: 'network-only',
        });
        const user = userRes.data?.userByToken;
        if (user) {
          useStore.getState().setUser({
            id: user.id,
            username: user.username,
            email: user.email,
          });
        }
        navigation.replace('Main');
      } else {
        setError('Неверный логин или пароль');
      }
    } catch (e: any) {
      setError(e?.message || 'Ошибка авторизации');
    }
  };

  return (
    <View
      style={[
        authStyles.container,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <Text
        style={[
          theme.typography.h1,
          {
            color: theme.colors.text,
            marginBottom: theme.spacing.xl,
            textAlign: 'center',
          },
        ]}
      >
        Вход
      </Text>

      <Controller
        control={control}
        name='login'
        rules={{ required: 'Обязательное поле' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              authStyles.input,
              { backgroundColor: theme.colors.card, color: theme.colors.text },
            ]}
            placeholder='Логин'
            value={value}
            onChangeText={onChange}
            autoCapitalize='none'
            placeholderTextColor={theme.colors.muted}
          />
        )}
      />
      {errors.login && (
        <Text style={[authStyles.error, { color: theme.colors.error }]}>
          {' '}
          {errors.login.message}{' '}
        </Text>
      )}

      <Controller
        control={control}
        name='password'
        rules={{ required: 'Обязательное поле' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              authStyles.input,
              { backgroundColor: theme.colors.card, color: theme.colors.text },
            ]}
            placeholder='Пароль'
            value={value}
            onChangeText={onChange}
            secureTextEntry
            placeholderTextColor={theme.colors.muted}
          />
        )}
      />
      {errors.password && (
        <Text style={[authStyles.error, { color: theme.colors.error }]}>
          {' '}
          {errors.password.message}{' '}
        </Text>
      )}

      <TouchableOpacity
        style={[authStyles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      >
        <Text
          style={[
            theme.typography.body,
            { color: theme.colors.card, fontWeight: '600' },
          ]}
        >
          {loading ? 'Входим...' : 'Войти'}
        </Text>
      </TouchableOpacity>

      {error && (
        <Text
          style={[
            authStyles.error,
            { color: theme.colors.error, marginTop: 8 },
          ]}
        >
          {error}
        </Text>
      )}

      <TouchableOpacity
        style={[authStyles.switchButton, { marginTop: theme.spacing.lg }]}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={[theme.typography.body, { color: theme.colors.primary }]}>
          Нет аккаунта? Зарегистрируйтесь
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
