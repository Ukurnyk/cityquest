import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { Location } from '../../../types/location';

interface LocationModalProps {
  location: Location;
  onClose: () => void;
  onStartQuest: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  location,
  onClose,
  onStartQuest,
}) => {
  const { theme: currentTheme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: currentTheme.colors.card }]}
    >
      <Text style={[styles.title, { color: currentTheme.colors.text }]}>
        {location.name}
      </Text>
      <Text style={[styles.description, { color: currentTheme.colors.muted }]}>
        {location.description}
      </Text>
      <Text style={[styles.address, { color: currentTheme.colors.muted }]}>
        {location.address}
      </Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: currentTheme.colors.primary },
          ]}
          onPress={onStartQuest}
        >
          <Text
            style={[styles.buttonText, { color: currentTheme.colors.card }]}
          >
            Начать квест
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: currentTheme.colors.border },
          ]}
          onPress={onClose}
        >
          <Text
            style={[styles.buttonText, { color: currentTheme.colors.text }]}
          >
            Закрыть
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  address: {
    fontSize: 14,
    marginBottom: 16,
  },
  buttons: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
