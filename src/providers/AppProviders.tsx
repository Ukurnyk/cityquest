import React from 'react';
import { ThemeProvider } from '@/theme/ThemeContext';
import { SafeAreaProvider } from '@/theme/SafeAreaContext';
import { ApolloProvider } from '@apollo/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { client } from '@/api/client';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 минут
      gcTime: 1000 * 60 * 30, // 30 минут
    },
  },
});

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <SafeAreaProvider>{children}</SafeAreaProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
};
