import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { theme } from '@/presentation/theme';
import { ThemeSelector } from '@/presentation/components/ThemeSelector';

export const SettingsScreen = () => {
  const { theme: currentTheme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: currentTheme.colors.background },
      ]}
    >
      <ThemeSelector />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },
});

export default SettingsScreen;
