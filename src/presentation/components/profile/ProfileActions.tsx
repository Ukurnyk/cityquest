import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ProfileActionsProps {
  onEditProfile: () => void;
  onViewHistory: () => void;
  onViewAchievements: () => void;
}

export const ProfileActions: React.FC<ProfileActionsProps> = ({
  onEditProfile,
  onViewHistory,
  onViewAchievements,
}) => {
  const { theme: currentTheme } = useTheme();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.actionButton,
          { backgroundColor: currentTheme.colors.card },
        ]}
        onPress={onEditProfile}
      >
        <Icon name='edit' size={24} color={currentTheme.colors.primary} />
        <Text style={[styles.actionText, { color: currentTheme.colors.text }]}>
          Редактировать профиль
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.actionButton,
          { backgroundColor: currentTheme.colors.card },
        ]}
        onPress={onViewHistory}
      >
        <Icon name='history' size={24} color={currentTheme.colors.primary} />
        <Text style={[styles.actionText, { color: currentTheme.colors.text }]}>
          История активности
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.actionButton,
          { backgroundColor: currentTheme.colors.card },
        ]}
        onPress={onViewAchievements}
      >
        <Icon
          name='emoji-events'
          size={24}
          color={currentTheme.colors.primary}
        />
        <Text style={[styles.actionText, { color: currentTheme.colors.text }]}>
          Достижения
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionText: {
    fontSize: 16,
    marginLeft: 12,
  },
});
