import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { LoginScreen, RegisterScreen } from '@/features/auth';
import { MainTabs } from '@/navigation/MainTabs';
import {
  AchievementsScreen,
  AchievementDetailsScreen,
} from '@/features/achievements';
import { LeaderboardScreen } from '@/features/leaderboard';
import { SettingsScreen } from '@/features/settings';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerStyle: {
            backgroundColor: '$background',
          },
          headerTintColor: '$text',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '600',
          },
          contentStyle: {
            backgroundColor: '$background',
          },
        }}
      >
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Main'
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Achievements'
          component={AchievementsScreen}
          options={{ title: 'Достижения' }}
        />
        <Stack.Screen
          name='AchievementDetails'
          component={AchievementDetailsScreen}
          options={{ title: 'Детали достижения' }}
        />
        <Stack.Screen
          name='Leaderboard'
          component={LeaderboardScreen}
          options={{ title: 'Таблица лидеров' }}
        />
        <Stack.Screen
          name='Settings'
          component={SettingsScreen}
          options={{ title: 'Настройки' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
