import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/services/apollo';

interface ApolloProviderWrapperProps {
  children: React.ReactNode;
}

export const ApolloProviderWrapper: React.FC<ApolloProviderWrapperProps> = ({
  children,
}) => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};
