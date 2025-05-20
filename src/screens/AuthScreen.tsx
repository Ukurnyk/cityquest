import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types';
import { api } from '@/services/api';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const AuthScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (type: 'anon' | 'google') => {
    setLoading(true);
    try {
      if (type === 'anon') {
        await api.loginAnon();
      } else {
        await api.loginGoogle();
      }
      navigation.replace('Main');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CityQuest</Text>
      <Text style={styles.subtitle}>Исследуй город, получай награды</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLogin('anon')}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Войти как гость</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.secondaryButton]}
        onPress={() => handleLogin('google')}
        disabled={loading}
      >
        <Text style={[styles.buttonText, styles.secondaryButtonText]}>
          Войти через Google
        </Text>
      </TouchableOpacity>
      {loading && (
        <ActivityIndicator style={{ marginTop: 24 }} color='#4B6CFF' />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2B2D42',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7B7F9E',
    marginBottom: 48,
  },
  button: {
    backgroundColor: '#4B6CFF',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#4B6CFF',
  },
  secondaryButtonText: {
    color: '#4B6CFF',
  },
});

export default AuthScreen;
