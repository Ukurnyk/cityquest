import React from 'react';
import { FlatList } from 'react-native';
import { YStack } from 'tamagui';
import { Achievement } from '@/domain/entities/Achievement';
import { AchievementCard } from './achievement-card';

interface AchievementListProps {
  achievements: Achievement[];
  onAchievementPress: (achievement: Achievement) => void;
}

export const AchievementList: React.FC<AchievementListProps> = ({
  achievements,
  onAchievementPress,
}) => {
  return (
    <YStack flex={1} backgroundColor='$background'>
      <FlatList
        data={achievements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AchievementCard achievement={item} onPress={onAchievementPress} />
        )}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  );
};
