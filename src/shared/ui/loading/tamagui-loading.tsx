import React from 'react';
import { YStack, Text, Spinner } from 'tamagui';

interface LoadingScreenProps {
  message?: string;
  size?: 'small' | 'large';
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = 'Загрузка...',
  size = 'large',
}) => {
  const getSpinnerSize = () => {
    return size === 'large' ? 'large' : 'small';
  };

  return (
    <YStack
      flex={1}
      justifyContent='center'
      alignItems='center'
      padding='$4'
      space='$3'
    >
      <Spinner size={getSpinnerSize()} color='$blue10' />
      <Text fontSize='$4' textAlign='center' color='$gray11'>
        {message}
      </Text>
    </YStack>
  );
};
