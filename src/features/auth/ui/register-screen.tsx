import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRegisterScreen } from '../model/use-register-screen';
import { Button } from '@/shared/ui/button';
import { FormField } from '@/shared/ui/form';
import { TextInput } from '@/shared/ui/input';
import { useForm, Controller } from 'react-hook-form';
import { RootStackParamList } from '@/types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { handleRegister, loading, error } = useRegisterScreen();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: 'Пароли не совпадают' });
      return;
    }
    handleRegister(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>

      <FormField
        label='Имя пользователя'
        required
        error={errors.username?.message}
      >
        <Controller
          control={control}
          name='username'
          rules={{ required: 'Обязательное поле' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder='Введите имя пользователя'
              value={value}
              onChangeText={onChange}
              autoCapitalize='none'
              error={!!errors.username}
            />
          )}
        />
      </FormField>

      <FormField label='Email' required error={errors.email?.message}>
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
              placeholder='Введите email'
              value={value}
              onChangeText={onChange}
              keyboardType='email-address'
              autoCapitalize='none'
              error={!!errors.email}
            />
          )}
        />
      </FormField>

      <FormField label='Пароль' required error={errors.password?.message}>
        <Controller
          control={control}
          name='password'
          rules={{ required: 'Обязательное поле' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder='Пароль'
              value={value}
              onChangeText={onChange}
              secureTextEntry
              error={!!errors.password}
            />
          )}
        />
      </FormField>

      <FormField
        label='Повторите пароль'
        required
        error={errors.confirmPassword?.message}
      >
        <Controller
          control={control}
          name='confirmPassword'
          rules={{ required: 'Обязательное поле' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder='Повторите пароль'
              value={value}
              onChangeText={onChange}
              secureTextEntry
              error={!!errors.confirmPassword}
            />
          )}
        />
      </FormField>

      <Button
        title={loading ? 'Регистрируем...' : 'Зарегистрироваться'}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
        style={styles.button}
      />

      {error && <Text style={styles.error}>{error}</Text>}

      <Button
        title='Уже есть аккаунт? Войти'
        onPress={() => navigation.navigate('Login')}
        variant='secondary'
        style={styles.switchButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    marginTop: 20,
  },
  error: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
    color: 'red',
  },
  switchButton: {
    marginTop: 20,
    backgroundColor: 'transparent',
  },
});
