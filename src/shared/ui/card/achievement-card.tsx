import React from 'react';
import { XStack, YStack, Text, Image, Card } from 'tamagui';
import { Achievement } from '@/domain/entities/Achievement';

interface AchievementCardProps {
  achievement: Achievement;
  onPress: (achievement: Achievement) => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onPress,
}) => {
  return (
    <Card
      pressStyle={{ scale: 0.98 }}
      onPress={() => onPress(achievement)}
      backgroundColor='$gray2'
      borderColor={achievement.isPartner ? '$blue8' : '$gray6'}
      borderLeftWidth={achievement.isPartner ? 4 : 0}
      borderRadius='$4'
      padding='$3'
      marginBottom='$3'
      elevation='$2'
    >
      <XStack space='$3' alignItems='center'>
        <Image
          source={{ uri: achievement.iconUrl }}
          width={48}
          height={48}
          borderRadius='$6'
        />
        <YStack flex={1} space='$2'>
          <XStack justifyContent='space-between' alignItems='center'>
            <Text fontSize='$4' fontWeight='600' color='$gray12' flex={1}>
              {achievement.title}
            </Text>
            {achievement.isPartner && (
              <Text
                fontSize='$2'
                color='$blue10'
                textTransform='uppercase'
                fontWeight='600'
              >
                Партнер
              </Text>
            )}
          </XStack>
          <Text fontSize='$3' color='$gray11' numberOfLines={2}>
            {achievement.description}
          </Text>
          <XStack justifyContent='flex-end'>
            <Text fontSize='$2' color='$blue10' fontWeight='600'>
              +{achievement.rewardScore} очков
            </Text>
          </XStack>
        </YStack>
      </XStack>
    </Card>
  );
};
