import React from 'react';
import Navigation from '@/navigation';
import { AppProviders } from '@/providers/AppProviders';

const App = () => {
  return (
    <AppProviders>
      <Navigation />
    </AppProviders>
  );
};

export default App;
