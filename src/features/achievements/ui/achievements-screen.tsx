import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, Card, Text, XStack, Avatar } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

const mockAchievements = [
  {
    id: '1',
    title: 'Первые шаги',
    description: 'Завершите свой первый квест',
    goal: 1,
    rewardScore: 100,
    iconUrl: 'https://example.com/icon1.png',
    isPartner: false,
    createdAt: '2024-01-01',
    city: {
      id: '1',
      name: 'Москва',
      description: 'Столица России',
    },
    category: {
      id: '1',
      name: 'Квесты',
      description: 'Достижения за выполнение квестов',
    },
  },
  {
    id: '2',
    title: 'Исследователь',
    description: 'Посетите 5 разных локаций',
    goal: 5,
    rewardScore: 250,
    iconUrl: 'https://example.com/icon2.png',
    isPartner: false,
    createdAt: '2024-01-01',
    city: {
      id: '1',
      name: 'Москва',
      description: 'Столица России',
    },
    category: {
      id: '2',
      name: 'Исследования',
      description: 'Достижения за исследование города',
    },
  },
];

export const AchievementsScreen: React.FC = () => {
  return (
    <YStack flex={1} backgroundColor='$background'>
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {mockAchievements.map((achievement) => (
          <Card
            key={achievement.id}
            padding='$4'
            marginBottom='$3'
            backgroundColor='$background'
            onPress={() =>
              console.log('Achievement pressed:', achievement.title)
            }
            pressStyle={{ scale: 0.98 }}
          >
            <XStack space='$3' alignItems='center'>
              <Avatar circular size='$6'>
                <Avatar.Image src={achievement.iconUrl} />
                <Avatar.Fallback backgroundColor='$gray5'>
                  <Ionicons name='trophy' size={24} />
                </Avatar.Fallback>
              </Avatar>
              <YStack flex={1}>
                <Text fontSize='$5' fontWeight='600'>
                  {achievement.title}
                </Text>
                <Text fontSize='$3' color='$gray11' numberOfLines={2}>
                  {achievement.description}
                </Text>
                <Text fontSize='$2' color='$blue10' marginTop='$1'>
                  {achievement.city.name} • {achievement.rewardScore} XP
                </Text>
              </YStack>
            </XStack>
          </Card>
        ))}
      </ScrollView>
    </YStack>
  );
};
