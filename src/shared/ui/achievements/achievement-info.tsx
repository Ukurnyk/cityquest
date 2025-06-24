import React from 'react';
import { YStack, Text, XStack, Progress } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

interface AchievementInfoProps {
  goal: number;
  progress: number;
  rewardScore: number;
  isCompleted: boolean;
}

export const AchievementInfo: React.FC<AchievementInfoProps> = ({
  goal,
  progress,
  rewardScore,
  isCompleted,
}) => {
  const progressPercentage = Math.min((progress / goal) * 100, 100);

  return (
    <YStack space='$4' padding='$4'>
      <YStack space='$2'>
        <XStack justifyContent='space-between' alignItems='center'>
          <Text fontSize='$4' fontWeight='500'>
            Прогресс
          </Text>
          <Text fontSize='$4' color='$gray11'>
            {progress} / {goal}
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
            Награда: {rewardScore} XP
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
  );
};
