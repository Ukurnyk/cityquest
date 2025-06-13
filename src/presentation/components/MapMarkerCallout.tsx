import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Callout } from 'react-native-maps';
import { Achievement } from '@/types';
import { theme } from '@/presentation/theme';
import { useTheme } from '@/theme/ThemeContext';

interface MapMarkerCalloutProps {
  location: Achievement;
}

export const MapMarkerCallout: React.FC<MapMarkerCalloutProps> = ({
  location,
}) => {
  const { theme: currentTheme } = useTheme();

  return (
    <Callout tooltip>
      <View
        style={[styles.callout, { backgroundColor: currentTheme.colors.card }]}
      >
        <Text
          style={[styles.title, { color: currentTheme.colors.text }]}
          numberOfLines={1}
        >
          {location.title}
        </Text>
        <Text
          style={[styles.description, { color: currentTheme.colors.muted }]}
          numberOfLines={2}
        >
          {location.description}
        </Text>
      </View>
    </Callout>
  );
};

const styles = StyleSheet.create({
  callout: {
    padding: 12,
    maxWidth: 200,
    borderRadius: theme.borderRadius.md,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    ...theme.typography.body,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    ...theme.typography.caption,
  },
});
