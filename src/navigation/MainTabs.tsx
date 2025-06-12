import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '@/screens/MapScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import { SettingsScreen } from '@/screens/SettingsScreen';
import AchievementsScreen from '@/screens/AchievementsScreen';
import { theme } from '@/presentation/theme';
import { useTheme } from '@/theme/ThemeContext';
import { TabParamList } from '@/types/navigation';

const Tab = createBottomTabNavigator<TabParamList>();

export const MainTabs = () => {
  const { theme: currentTheme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: currentTheme.colors.card,
          borderTopColor: currentTheme.colors.border,
        },
        tabBarActiveTintColor: currentTheme.colors.primary,
        tabBarInactiveTintColor: currentTheme.colors.muted,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name='Map'
        component={MapScreen}
        options={{
          tabBarLabel: 'Карта',
        }}
      />
      <Tab.Screen
        name='Achievements'
        component={AchievementsScreen}
        options={{
          tabBarLabel: 'Достижения',
        }}
      />
      <Tab.Screen
        name='Profile'
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Профиль',
        }}
      />
      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Настройки',
        }}
      />
    </Tab.Navigator>
  );
};
