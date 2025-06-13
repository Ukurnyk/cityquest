import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCreateUserMutation } from '@/gql/operations';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { theme } from '@/presentation/theme';
import { authStyles } from './styles';
import { client } from '@/api/client';
import { GetUserDocument } from '@/gql/operations';
import { useStore } from '@/store';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [createUser, { loading }] = useCreateUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: 'Пароли не совпадают' });
      return;
    }

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
        // Сохраняем токен
        await useStore.getState().setToken(response.createUser);
        // Получаем пользователя по токену
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
      }
    } catch (err) {
      setError('root', {
        message: err instanceof Error ? err.message : 'Ошибка при регистрации',
      });
    }
  };

  const RequiredIndicator = () => (
    <Text style={{ color: theme.colors.error, marginLeft: 4 }}>*</Text>
  );

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
        Регистрация
      </Text>

      <View
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}
      >
        <Text style={[theme.typography.body, { color: theme.colors.text }]}>
          Имя пользователя
        </Text>
        <RequiredIndicator />
      </View>
      <Controller
        control={control}
        name='username'
        rules={{ required: 'Обязательное поле' }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              authStyles.input,
              { backgroundColor: theme.colors.card, color: theme.colors.text },
            ]}
            placeholder='Введите имя пользователя'
            value={value}
            onChangeText={onChange}
            autoCapitalize='none'
            placeholderTextColor={theme.colors.muted}
          />
        )}
      />
      {errors.username && (
        <Text style={[authStyles.error, { color: theme.colors.error }]}>
          {errors.username.message}
        </Text>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 4,
          marginTop: theme.spacing.md,
        }}
      >
        <Text style={[theme.typography.body, { color: theme.colors.text }]}>
          Email
        </Text>
        <RequiredIndicator />
      </View>
      <Controller
        control={control}
        name='email'
        rules={{
          required: 'Обязательное поле',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Неверный формат email',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[
              authStyles.input,
              { backgroundColor: theme.colors.card, color: theme.colors.text },
            ]}
            placeholder='Введите email'
            value={value}
            onChangeText={onChange}
            keyboardType='email-address'
            autoCapitalize='none'
            placeholderTextColor={theme.colors.muted}
          />
        )}
      />
      {errors.email && (
        <Text style={[authStyles.error, { color: theme.colors.error }]}>
          {errors.email.message}
        </Text>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 4,
          marginTop: theme.spacing.md,
        }}
      >
        <Text style={[theme.typography.body, { color: theme.colors.text }]}>
          Пароль
        </Text>
        <RequiredIndicator />
      </View>
      <Controller
        control={control}
        name='password'
        rules={{
          required: 'Обязательное поле',
          minLength: {
            value: 6,
            message: 'Минимум 6 символов',
          },
        }}
        render={({ field: { onChange, value } }) => (
          <View style={{ position: 'relative' }}>
            <TextInput
              style={[
                authStyles.input,
                {
                  backgroundColor: theme.colors.card,
                  color: theme.colors.text,
                  paddingRight: 40,
                },
              ]}
              placeholder='Введите пароль'
              value={value}
              onChangeText={onChange}
              secureTextEntry
              placeholderTextColor={theme.colors.muted}
            />
          </View>
        )}
      />
      {errors.password && (
        <Text style={[authStyles.error, { color: theme.colors.error }]}>
          {errors.password.message}
        </Text>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 4,
          marginTop: theme.spacing.md,
        }}
      >
        <Text style={[theme.typography.body, { color: theme.colors.text }]}>
          Подтверждение пароля
        </Text>
        <RequiredIndicator />
      </View>
      <Controller
        control={control}
        name='confirmPassword'
        rules={{
          required: 'Обязательное поле',
          validate: (value) =>
            value === watch('password') || 'Пароли не совпадают',
        }}
        render={({ field: { onChange, value } }) => (
          <View style={{ position: 'relative' }}>
            <TextInput
              style={[
                authStyles.input,
                {
                  backgroundColor: theme.colors.card,
                  color: theme.colors.text,
                  paddingRight: 40,
                },
              ]}
              placeholder='Повторите пароль'
              value={value}
              onChangeText={onChange}
              secureTextEntry
              placeholderTextColor={theme.colors.muted}
            />
          </View>
        )}
      />
      {errors.confirmPassword && (
        <Text style={[authStyles.error, { color: theme.colors.error }]}>
          {errors.confirmPassword.message}
        </Text>
      )}

      {errors.root && (
        <Text style={[authStyles.error, { color: theme.colors.error }]}>
          {errors.root.message}
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
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[authStyles.switchButton, { marginTop: theme.spacing.lg }]}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={[theme.typography.body, { color: theme.colors.primary }]}>
          Уже есть аккаунт? Войдите
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
