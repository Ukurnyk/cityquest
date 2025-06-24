import React from 'react';
import { YStack } from 'tamagui';
import { ThemeSelector } from '@/shared/ui/theme/theme-selector';

export const SettingsScreen: React.FC = () => {
  return (
    <YStack flex={1} backgroundColor='$background' padding='$4'>
      <ThemeSelector
        value='light'
        onChange={(theme: string) => console.log('Theme changed:', theme)}
      />
    </YStack>
  );
};
