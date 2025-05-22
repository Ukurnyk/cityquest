import React, { createContext, useContext } from 'react';
import { Platform, StatusBar } from 'react-native';

interface SafeAreaContextType {
  statusBarHeight: number;
  topPadding: number;
  bottomPadding: number;
}

const SafeAreaContext = createContext<SafeAreaContextType>({
  statusBarHeight: 0,
  topPadding: 16,
  bottomPadding: 16,
});

export const SafeAreaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;
  const topPadding = statusBarHeight + 16;
  const bottomPadding = Platform.OS === 'ios' ? 34 : 16;

  return (
    <SafeAreaContext.Provider
      value={{
        statusBarHeight,
        topPadding,
        bottomPadding,
      }}
    >
      {children}
    </SafeAreaContext.Provider>
  );
};

export const useSafeArea = () => {
  const context = useContext(SafeAreaContext);
  if (!context) {
    throw new Error('useSafeArea must be used within a SafeAreaProvider');
  }
  return context;
};
