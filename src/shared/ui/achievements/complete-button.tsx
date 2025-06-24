import React from 'react';
import { Button, Text, YStack } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';

interface CompleteButtonProps {
  onComplete: () => void;
  isCompleted: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

export const CompleteButton: React.FC<CompleteButtonProps> = ({
  onComplete,
  isCompleted,
  isLoading = false,
  disabled = false,
}) => {
  if (isCompleted) {
    return (
      <YStack padding='$4'>
        <Button
          size='$4'
          theme='green'
          disabled
          icon={<Ionicons name='checkmark-circle' size={20} />}
        >
          <Text fontSize='$4' fontWeight='500'>
            Завершено
          </Text>
        </Button>
      </YStack>
    );
  }

  return (
    <YStack padding='$4'>
      <Button
        size='$4'
        theme='blue'
        onPress={onComplete}
        disabled={disabled || isLoading}
        icon={isLoading ? undefined : <Ionicons name='play' size={20} />}
      >
        <Text fontSize='$4' fontWeight='500'>
          {isLoading ? 'Загрузка...' : 'Начать квест'}
        </Text>
      </Button>
    </YStack>
  );
};
