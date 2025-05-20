import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from '@/types';
import { Ionicons } from '@expo/vector-icons';

// Импорты экранов (будут созданы позже)
import AuthScreen from '@screens/AuthScreen';
import MapScreen from '@screens/MapScreen';
import ProfileScreen from '@screens/ProfileScreen';
import LeaderboardScreen from '@screens/LeaderboardScreen';
import AchievementDetailsScreen from '@screens/AchievementDetailsScreen';
import SettingsScreen from '@screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF6B4A',
        tabBarInactiveTintColor: '#7B7F9E',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
      }}
    >
      <Tab.Screen
        name='Map'
        component={MapScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Карта',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='map-outline' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Профиль',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='person-outline' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Leaderboard'
        component={LeaderboardScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Топ',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='trophy-outline' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Настройки',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name='settings-outline' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Auth' component={AuthScreen} />
        <Stack.Screen name='Main' component={MainTabs} />
        <Stack.Screen
          name='AchievementDetails'
          component={AchievementDetailsScreen}
          options={{
            headerShown: true,
            title: 'Достижение',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
