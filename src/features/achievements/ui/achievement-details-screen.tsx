import React from 'react';
import { ScrollView } from 'react-native';
import { YStack, Text, XStack, Avatar, Progress, Button } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

const mockAchievement = {
  id: '1',
  title: 'Первые шаги',
  description:
    'Завершите свой первый квест. Это достижение поможет вам начать свой путь в мире квестов и исследований.',
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
};

export const AchievementDetailsScreen: React.FC = () => {
  const progress = 0;
  const isCompleted = false;
  const progressPercentage = Math.min(
    (progress / mockAchievement.goal) * 100,
    100
  );

  return (
    <YStack flex={1} backgroundColor='$background'>
      <ScrollView
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <YStack space='$3' padding='$4'>
          <XStack space='$3' alignItems='center'>
            <Avatar circular size='$8'>
              <Avatar.Image src={mockAchievement.iconUrl} />
              <Avatar.Fallback backgroundColor='$gray5'>
                <Ionicons name='trophy' size={40} />
              </Avatar.Fallback>
            </Avatar>
            <YStack flex={1}>
              <Text fontSize='$7' fontWeight='600'>
                {mockAchievement.title}
              </Text>
              <Text fontSize='$4' color='$gray11'>
                {mockAchievement.city.name}
              </Text>
            </YStack>
          </XStack>
          <Text fontSize='$4' color='$gray12' lineHeight='$5'>
            {mockAchievement.description}
          </Text>
        </YStack>

        {/* Progress */}
        <YStack space='$4' padding='$4'>
          <YStack space='$2'>
            <XStack justifyContent='space-between' alignItems='center'>
              <Text fontSize='$4' fontWeight='500'>
                Прогресс
              </Text>
              <Text fontSize='$4' color='$gray11'>
                {progress} / {mockAchievement.goal}
              </Text>
            </XStack>
            <Progress value={progressPercentage} size='$2'>
              <Progress.Indicator />
            </Progress>
          </YStack>

          <XStack space='$4' justifyContent='space-between'>
            <XStack space='$2' alignItems='center'>
              <Ionicons name='star' size={20} color='#FFD700' />
              <Text fontSize='$4' fontWeight='500'>
                Награда: {mockAchievement.rewardScore} XP
              </Text>
            </XStack>
            {isCompleted && (
              <XStack space='$2' alignItems='center'>
                <Ionicons name='checkmark-circle' size={20} color='#4CAF50' />
                <Text fontSize='$4' color='$green10' fontWeight='500'>
                  Завершено
                </Text>
              </XStack>
            )}
          </XStack>
        </YStack>

        {/* Action Button */}
        <YStack padding='$4'>
          <Button
            size='$4'
            theme={isCompleted ? 'green' : 'blue'}
            disabled={isCompleted}
            icon={
              isCompleted ? (
                <Ionicons name='checkmark-circle' size={20} />
              ) : (
                <Ionicons name='play' size={20} />
              )
            }
          >
            <Text fontSize='$4' fontWeight='500'>
              {isCompleted ? 'Завершено' : 'Начать квест'}
            </Text>
          </Button>
        </YStack>
      </ScrollView>
    </YStack>
  );
};
