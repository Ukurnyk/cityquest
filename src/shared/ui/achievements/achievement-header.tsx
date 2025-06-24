import React from 'react';
import { YStack, Text, XStack, Avatar } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { Achievement } from '@/types';

interface AchievementHeaderProps {
  achievement: Achievement;
}

export const AchievementHeader: React.FC<AchievementHeaderProps> = ({
  achievement,
}) => {
  return (
    <YStack space='$3' padding='$4'>
      <XStack space='$3' alignItems='center'>
        <Avatar circular size='$6'>
          <Avatar.Image src={achievement.iconUrl} />
          <Avatar.Fallback backgroundColor='$gray5'>
            <Ionicons name='trophy' size={24} />
          </Avatar.Fallback>
        </Avatar>
        <YStack flex={1}>
          <Text fontSize='$6' fontWeight='600'>
            {achievement.title}
          </Text>
          <Text fontSize='$4' color='$gray11'>
            {achievement.city.name}
          </Text>
        </YStack>
      </XStack>
      <Text fontSize='$4' color='$gray12' lineHeight='$5'>
        {achievement.description}
      </Text>
    </YStack>
  );
};
