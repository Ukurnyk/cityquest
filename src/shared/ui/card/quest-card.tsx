import React from 'react';
import { YStack, Text, XStack, Card } from 'tamagui';
import { Quest } from '@/domain/entities/Quest';

interface QuestCardProps {
  quest: Quest;
  onPress: (quest: Quest) => void;
}

type QuestStatusStyle = 'active' | 'completed' | 'locked';

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onPress }) => {
  const statusStyle = quest.status.toLowerCase() as QuestStatusStyle;

  const getStatusColor = () => {
    switch (statusStyle) {
      case 'active':
        return '$blue10';
      case 'completed':
        return '$green10';
      case 'locked':
        return '$gray8';
      default:
        return '$gray8';
    }
  };

  return (
    <Card
      padding='$4'
      marginBottom='$3'
      backgroundColor='$background'
      borderLeftWidth={4}
      borderLeftColor={getStatusColor()}
      opacity={statusStyle === 'locked' ? 0.7 : 1}
      onPress={() => onPress(quest)}
      pressStyle={{ scale: 0.98 }}
    >
      <YStack space='$2'>
        <XStack justifyContent='space-between' alignItems='center'>
          <Text fontSize='$5' fontWeight='600' flex={1}>
            {quest.title}
          </Text>
          <Text fontSize='$4' color='$blue10' fontWeight='600'>
            {quest.points} pts
          </Text>
        </XStack>

        <Text fontSize='$3' color='$gray11' numberOfLines={2}>
          {quest.description}
        </Text>

        <XStack justifyContent='space-between' alignItems='center'>
          <Text fontSize='$2' color='$blue10' textTransform='uppercase'>
            {quest.type}
          </Text>
          <Text fontSize='$2' color='$green10' fontWeight='600'>
            +{quest.rewards.experience} XP
          </Text>
        </XStack>
      </YStack>
    </Card>
  );
};
