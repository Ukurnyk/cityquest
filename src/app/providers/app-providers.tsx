import React from 'react';
import { ThemeProvider } from '@/theme/ThemeContext';
import { SafeAreaProvider } from '@/theme/SafeAreaContext';
import { ApolloProviderWrapper } from './apollo-provider';
import { TamaguiProvider } from 'tamagui';
import config from '../../../tamagui.config';

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <TamaguiProvider config={config}>
      <ApolloProviderWrapper>
        <ThemeProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </ThemeProvider>
      </ApolloProviderWrapper>
    </TamaguiProvider>
  );
};
