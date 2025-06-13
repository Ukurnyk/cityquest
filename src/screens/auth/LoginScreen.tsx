import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '@/presentation/theme';
import { authStyles } from './styles';
import { useLoginUserMutation, GetUserDocument } from '@/gql/operations';
import { client } from '@/api/client';
import { useStore } from '@/store';

type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Register: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [loginUser, { loading }] = useLoginUserMutation();

  const handleSubmit = async () => {
    setError(null);
    if (!email || !password) {
      setError('Введите email и пароль');
      return;
    }
    try {
      const { data } = await loginUser({
        variables: { login: email, password },
      });
      if (data?.loginUser) {
        await useStore.getState().setToken(data.loginUser);
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

      <TextInput
        style={[
          authStyles.input,
          { backgroundColor: theme.colors.card, color: theme.colors.text },
        ]}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
        autoCapitalize='none'
        placeholderTextColor={theme.colors.muted}
      />

      <TextInput
        style={[
          authStyles.input,
          { backgroundColor: theme.colors.card, color: theme.colors.text },
        ]}
        placeholder='Пароль'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor={theme.colors.muted}
      />

      <TouchableOpacity
        style={[authStyles.button, { backgroundColor: theme.colors.primary }]}
        onPress={handleSubmit}
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
