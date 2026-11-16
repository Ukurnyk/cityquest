import { MaterialIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { type ColorValue } from 'react-native';

import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';

function TabBarIcon({
  name,
  color,
}: {
  name: React.ComponentProps<typeof MaterialIcons>['name'];
  color: ColorValue;
}) {
  // Tabs передают ColorValue (в RN 0.88 это ещё null | number), а типы @expo/vector-icons
  // принимают только string | OpaqueColorValue. Цвета вкладок задаются строками в screenOptions.
  return (
    <MaterialIcons
      size={26}
      style={{ marginBottom: -3 }}
      name={name}
      color={typeof color === 'string' ? color : undefined}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          paddingTop: 8,
          paddingBottom: 8,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '700',
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Карта',
          tabBarIcon: ({ color }) => <TabBarIcon name='map' color={color} />,
          headerTitle: 'Questly',
        }}
      />
      <Tabs.Screen
        name='places'
        options={{
          title: 'Места',
          tabBarIcon: ({ color }) => <TabBarIcon name='place' color={color} />,
          headerTitle: 'Каталог мест',
        }}
      />
      <Tabs.Screen
        name='quests'
        options={{
          title: 'Квесты',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='explore' color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name='achievements'
        options={{
          title: 'Ачивки',
          tabBarIcon: ({ color }) => (
            <TabBarIcon name='emoji-events' color={color} />
          ),
          headerTitle: 'Достижения',
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color }) => <TabBarIcon name='person' color={color} />,
          headerTitle: 'Мой профиль',
        }}
      />
    </Tabs>
  );
}
