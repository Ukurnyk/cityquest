import React from 'react';
import { XStack, YStack, Text, Circle, Progress } from 'tamagui';

interface ProfileHeaderProps {
  username: string;
  level: number;
  xp: number;
  avatarUrl?: string;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  username,
  level,
  xp,
  avatarUrl,
}) => {
  const xpProgress = (xp / 1000) * 100;

  return (
    <XStack padding='$5' alignItems='center' space='$4'>
      <Circle
        size={80}
        backgroundColor='$blue10'
        justifyContent='center'
        alignItems='center'
      >
        <Text fontSize='$8' fontWeight='bold' color='$white'>
          {username.charAt(0).toUpperCase()}
        </Text>
      </Circle>
      <YStack flex={1} space='$2'>
        <Text fontSize='$6' fontWeight='bold' color='$gray12'>
          {username}
        </Text>
        <Text fontSize='$4' color='$gray11'>
          Уровень {level}
        </Text>
        <YStack space='$1' marginTop='$2'>
          <Progress value={xpProgress} backgroundColor='$gray6' />
          <Text fontSize='$2' color='$gray11'>
            {xp}/1000 XP
          </Text>
        </YStack>
      </YStack>
    </XStack>
  );
};
