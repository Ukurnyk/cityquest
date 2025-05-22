import React from 'react';
import { ThemeProvider } from '@/theme/ThemeContext';
import { SafeAreaProvider } from '@/theme/SafeAreaContext';
import { RootNavigator } from '@/navigation';

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
