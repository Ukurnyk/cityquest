import React from 'react';
import { AppProviders } from './providers/app-providers';
import { AppNavigation } from './navigation/app-navigation';

export const App = () => {
  return (
    <AppProviders>
      <AppNavigation />
    </AppProviders>
  );
};
