import React from 'react';
import { Callout } from 'react-native-maps';
import { YStack, Text, Button } from 'tamagui';
import { Achievement } from '@/types';

interface MapMarkerCalloutProps {
  achievement: Achievement;
  onStartQuest: (achievement: Achievement) => void;
}

export const MapMarkerCallout: React.FC<MapMarkerCalloutProps> = ({
  achievement,
  onStartQuest,
}) => {
  return (
    <Callout>
      <YStack padding='$3' space='$2' minWidth={200}>
        <Text fontSize='$5' fontWeight='600'>
          {achievement.title}
        </Text>
        <Text fontSize='$3' color='$gray11' numberOfLines={2}>
          {achievement.description}
        </Text>
        <Button
          size='$3'
          theme='blue'
          onPress={() => onStartQuest(achievement)}
        >
          <Text fontSize='$3' fontWeight='500'>
            Начать квест
          </Text>
        </Button>
      </YStack>
    </Callout>
  );
};
