import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, Button, Text, XStack, Avatar } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { useProfileScreen } from '../model/use-profile-screen';

export const ProfileScreen: React.FC = () => {
  const { user, handleLogout, handleAchievements, handleSettings } =
    useProfileScreen();

  return (
    <YStack flex={1} backgroundColor='$background'>
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <YStack space='$3' padding='$4' alignItems='center'>
          <Avatar circular size='$8'>
            <Avatar.Fallback backgroundColor='$gray5'>
              <Ionicons name='person' size={40} />
            </Avatar.Fallback>
          </Avatar>
          <YStack alignItems='center'>
            <Text fontSize='$6' fontWeight='600'>
              {user?.username || 'Иван Иванов'}
            </Text>
            <Text fontSize='$4' color='$gray11'>
              Уровень 5 • 750 XP
            </Text>
          </YStack>
        </YStack>

        {/* Profile Stats */}
        <YStack space='$3' padding='$4'>
          <XStack space='$4' justifyContent='space-around'>
            <YStack alignItems='center'>
              <Text fontSize='$5' fontWeight='600' color='$blue10'>
                12
              </Text>
              <Text fontSize='$3' color='$gray11'>
                Квестов
              </Text>
            </YStack>
            <YStack alignItems='center'>
              <Text fontSize='$5' fontWeight='600' color='$green10'>
                8
              </Text>
              <Text fontSize='$3' color='$gray11'>
                Локаций
              </Text>
            </YStack>
            <YStack alignItems='center'>
              <Text fontSize='$5' fontWeight='600' color='$orange10'>
                3
              </Text>
              <Text fontSize='$3' color='$gray11'>
                Достижения
              </Text>
            </YStack>
          </XStack>
        </YStack>

        {/* Actions */}
        <YStack space='$3' marginTop='$4'>
          <Button theme='blue' onPress={handleAchievements}>
            <Text fontSize='$4' fontWeight='600' color='$background'>
              Достижения
            </Text>
          </Button>
          <Button theme='blue' onPress={handleSettings}>
            <Text fontSize='$4' fontWeight='600' color='$background'>
              Настройки
            </Text>
          </Button>
          <Button theme='red' onPress={handleLogout}>
            <Text fontSize='$4' fontWeight='600' color='$background'>
              Выйти
            </Text>
          </Button>
        </YStack>
      </ScrollView>
    </YStack>
  );
};
