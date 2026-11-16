/**
 * Экран авторизации / регистрации
 */
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';

type Mode = 'login' | 'register';

export default function LoginScreen() {
  const { login, register } = useAuth();

  const [mode, setMode] = useState<Mode>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Ошибка', 'Заполните логин и пароль');
      return;
    }
    if (mode === 'register' && !email.trim()) {
      Alert.alert('Ошибка', 'Введите email');
      return;
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        await login(username.trim(), password.trim());
      } else {
        await register(username.trim(), email.trim(), password.trim());
      }
    } catch (e: any) {
      Alert.alert('Ошибка', e?.message ?? 'Что-то пошло не так');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.card}>
        {/* Логотип / заголовок */}
        <Text style={styles.logo}>🗺️</Text>
        <Text style={styles.title}>QuestCity</Text>
        <Text style={styles.subtitle}>
          {mode === 'login' ? 'Войдите в аккаунт' : 'Создайте аккаунт'}
        </Text>

        {/* Поля ввода */}
        <TextInput
          style={styles.input}
          placeholder='Логин'
          placeholderTextColor='#8B8FA8'
          value={username}
          onChangeText={setUsername}
          autoCapitalize='none'
          autoCorrect={false}
        />

        {mode === 'register' && (
          <TextInput
            style={styles.input}
            placeholder='Email'
            placeholderTextColor='#8B8FA8'
            value={email}
            onChangeText={setEmail}
            autoCapitalize='none'
            keyboardType='email-address'
            autoCorrect={false}
          />
        )}

        <TextInput
          style={styles.input}
          placeholder='Пароль'
          placeholderTextColor='#8B8FA8'
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Кнопка действия */}
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color='#fff' />
          ) : (
            <Text style={styles.buttonText}>
              {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Text>
          )}
        </Pressable>

        {/* Переключение режима */}
        <Pressable
          onPress={() => setMode(mode === 'login' ? 'register' : 'login')}
        >
          <Text style={styles.switchText}>
            {mode === 'login'
              ? 'Нет аккаунта? Зарегистрироваться'
              : 'Уже есть аккаунт? Войти'}
          </Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1117',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#1A1D2E',
    borderRadius: 24,
    padding: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    alignItems: 'center',
  },
  logo: {
    fontSize: 56,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#8B8FA8',
    marginBottom: 28,
  },
  input: {
    width: '100%',
    backgroundColor: '#252840',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2E3150',
  },
  button: {
    width: '100%',
    backgroundColor: '#6C5CE7',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  switchText: {
    color: '#6C5CE7',
    fontSize: 14,
    fontWeight: '500',
  },
});
