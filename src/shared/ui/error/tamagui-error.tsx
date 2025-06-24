import React from 'react';
import { YStack, Text, Button } from 'tamagui';

interface ErrorScreenProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorScreen: React.FC<ErrorScreenProps> = ({
  title = 'Произошла ошибка',
  message,
  onRetry,
  retryText = 'Повторить',
}) => {
  return (
    <YStack
      flex={1}
      justifyContent='center'
      alignItems='center'
      padding='$4'
      space='$4'
    >
      <Text fontSize='$6' fontWeight='600' textAlign='center' color='$red10'>
        {title}
      </Text>
      {message && (
        <Text fontSize='$4' textAlign='center' color='$gray11'>
          {message}
        </Text>
      )}
      {onRetry && (
        <Button theme='red' size='$4' onPress={onRetry} marginTop='$4'>
          {retryText}
        </Button>
      )}
    </YStack>
  );
};
