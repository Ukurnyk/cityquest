import React from 'react';
import { XStack, YStack, Text } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

interface ProfileStatsProps {
  completedQuests: number;
  visitedLocations: number;
  achievements: number;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  completedQuests,
  visitedLocations,
  achievements,
}) => {
  return (
    <XStack
      justifyContent='space-around'
      padding='$5'
      borderTopWidth={1}
      borderBottomWidth={1}
      borderColor='$gray5'
      space='$4'
    >
      <YStack alignItems='center' space='$1'>
        <MaterialIcons name='flag' size={24} color='#2563eb' />
        <Text fontSize='$5' fontWeight='bold' color='$gray12'>
          {completedQuests}
        </Text>
        <Text fontSize='$3' color='$gray10'>
          Квестов
        </Text>
      </YStack>
      <YStack alignItems='center' space='$1'>
        <MaterialIcons name='place' size={24} color='#2563eb' />
        <Text fontSize='$5' fontWeight='bold' color='$gray12'>
          {visitedLocations}
        </Text>
        <Text fontSize='$3' color='$gray10'>
          Мест
        </Text>
      </YStack>
      <YStack alignItems='center' space='$1'>
        <MaterialIcons name='emoji-events' size={24} color='#2563eb' />
        <Text fontSize='$5' fontWeight='bold' color='$gray12'>
          {achievements}
        </Text>
        <Text fontSize='$3' color='$gray10'>
          Достижений
        </Text>
      </YStack>
    </XStack>
  );
};
