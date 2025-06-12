import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import { useCreateUserMutation } from '@/gql/graphql';

export const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [cityId, setCityId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createUser, { data, loading, error }] = useCreateUserMutation();

  const handleRegister = () => {
    createUser({
      variables: {
        user: {
          username,
          email,
          password,
          cityId,
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder='Username'
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder='City ID'
        value={cityId}
        onChangeText={setCityId}
      />
      <Button
        title='Зарегистрироваться'
        onPress={handleRegister}
        disabled={loading}
      />
      {error && <Text style={styles.error}>Ошибка: {error.message}</Text>}
      {data && (
        <Text style={styles.success}>Успех! Токен: {data.createUser}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  error: {
    color: 'red',
    marginTop: 8,
  },
  success: {
    color: 'green',
    marginTop: 8,
  },
});

export default RegisterScreen;
