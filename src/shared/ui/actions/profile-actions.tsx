import React from 'react';
import { YStack, XStack, Text, Button } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

interface ProfileActionsProps {
  onEditProfile: () => void;
  onViewHistory: () => void;
  onViewAchievements: () => void;
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({
  onEditProfile,
  onViewHistory,
  onViewAchievements,
}) => {
  return (
    <YStack padding='$5' space='$3'>
      <Button
        theme='gray'
        size='$4'
        borderRadius='$4'
        icon={<MaterialIcons name='edit' size={22} color='#2563eb' />}
        justifyContent='flex-start'
        onPress={onEditProfile}
      >
        <Text fontSize='$4' marginLeft={12} color='$gray12'>
          Редактировать профиль
        </Text>
      </Button>
      <Button
        theme='gray'
        size='$4'
        borderRadius='$4'
        icon={<MaterialIcons name='history' size={22} color='#2563eb' />}
        justifyContent='flex-start'
        onPress={onViewHistory}
      >
        <Text fontSize='$4' marginLeft={12} color='$gray12'>
          История активности
        </Text>
      </Button>
      <Button
        theme='gray'
        size='$4'
        borderRadius='$4'
        icon={<MaterialIcons name='emoji-events' size={22} color='#2563eb' />}
        justifyContent='flex-start'
        onPress={onViewAchievements}
      >
        <Text fontSize='$4' marginLeft={12} color='$gray12'>
          Достижения
        </Text>
      </Button>
    </YStack>
  );
};
