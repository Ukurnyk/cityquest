import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { Location } from '@/domain/entities/Location';
import { theme } from '@/presentation/theme';
import { useTheme } from '@/theme/ThemeContext';

interface LocationModalProps {
  location: Location | null;
  visible: boolean;
  fadeAnim: Animated.Value;
  onClose: () => void;
  onStartQuest: () => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  location,
  visible,
  fadeAnim,
  onClose,
  onStartQuest,
}) => {
  const { theme: currentTheme } = useTheme();

  if (!location) return null;

  return (
    <Animated.View style={[styles.modalContainer, { opacity: fadeAnim }]}>
      <View
        style={[
          styles.modalContent,
          { backgroundColor: currentTheme.colors.card },
        ]}
      >
        <Text style={[styles.title, { color: currentTheme.colors.text }]}>
          {location.name}
        </Text>
        <Text style={[styles.description, { color: currentTheme.colors.text }]}>
          {location.description}
        </Text>
        <Text style={[styles.address, { color: currentTheme.colors.muted }]}>
          {location.address}
        </Text>
        <Text style={[styles.rating, { color: currentTheme.colors.accent }]}>
          Рейтинг: {location.rating} ⭐
        </Text>
        <TouchableOpacity
          style={[
            styles.questButton,
            { backgroundColor: currentTheme.colors.primary },
          ]}
          onPress={onStartQuest}
        >
          <Text
            style={[
              styles.questButtonText,
              { color: currentTheme.colors.card },
            ]}
          >
            Начать квест
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text
            style={[
              styles.closeButtonText,
              { color: currentTheme.colors.muted },
            ]}
          >
            Закрыть
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: theme.spacing.lg,
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
    ...theme.typography.h1,
    marginBottom: theme.spacing.md,
  },
  description: {
    ...theme.typography.body,
    marginBottom: theme.spacing.md,
  },
  address: {
    ...theme.typography.small,
    marginBottom: theme.spacing.sm,
  },
  rating: {
    ...theme.typography.body,
    marginBottom: theme.spacing.lg,
  },
  questButton: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  questButtonText: {
    ...theme.typography.body,
    fontWeight: '600',
  },
  closeButton: {
    padding: theme.spacing.md,
    alignItems: 'center',
  },
  closeButtonText: {
    ...theme.typography.body,
  },
});
