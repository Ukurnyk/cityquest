import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { theme } from '@/presentation/theme';
import { useLoginScreen } from '../model/use-login-screen';
import { Button } from '@/shared/ui/button';
import { FormField } from '@/shared/ui/form';
import { TextInput } from '@/shared/ui/input';
import { useForm, Controller } from 'react-hook-form';
import { RootStackParamList } from '@/types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type FormData = { login: string; password: string };

export const LoginScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { handleLogin, loading, error } = useLoginScreen();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: { login: '', password: '' },
  });

  const onSubmit = (data: FormData) => {
    handleLogin(data);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>Вход</Text>

      <FormField label='Логин' required error={errors.login?.message}>
        <Controller
          control={control}
          name='login'
          rules={{ required: 'Обязательное поле' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder='Логин'
              value={value}
              onChangeText={onChange}
              autoCapitalize='none'
              error={!!errors.login}
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

      <Button
        title={loading ? 'Входим...' : 'Войти'}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
        style={styles.button}
      />

      {error && (
        <Text style={[styles.error, { color: theme.colors.error }]}>
          {error}
        </Text>
      )}

      <Button
        title='Нет аккаунта? Зарегистрируйтесь'
        onPress={() => navigation.navigate('Register')}
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
  },
  switchButton: {
    marginTop: 20,
    backgroundColor: 'transparent',
  },
});
