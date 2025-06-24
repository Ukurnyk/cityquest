import React from 'react';
import { YStack, Text, XStack, Button, Sheet } from 'tamagui';
import { Achievement } from '@/types';

interface LocationModalProps {
  location: Achievement;
  onClose: () => void;
  onStartQuest: () => void;
  visible: boolean;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  location,
  onClose,
  onStartQuest,
  visible,
}) => {
  return (
    <Sheet
      modal
      open={visible}
      onOpenChange={onClose}
      snapPoints={[40]}
      position={0}
      dismissOnSnapToBottom
    >
      <Sheet.Overlay />
      <Sheet.Frame
        padding='$4'
        justifyContent='flex-start'
        alignItems='stretch'
      >
        <Sheet.Handle />
        <YStack space='$3'>
          <Text fontSize='$6' fontWeight='bold' color='$gray12'>
            {location.title}
          </Text>
          <Text fontSize='$4' color='$gray11'>
            {location.description}
          </Text>
          <Text fontSize='$3' color='$gray10'>
            {location.city?.name || ''}
          </Text>
          <XStack space='$3' marginTop='$2'>
            <Button flex={1} theme='blue' onPress={onStartQuest}>
              Начать квест
            </Button>
            <Button flex={1} theme='gray' variant='outlined' onPress={onClose}>
              Закрыть
            </Button>
          </XStack>
        </YStack>
      </Sheet.Frame>
    </Sheet>
  );
};
