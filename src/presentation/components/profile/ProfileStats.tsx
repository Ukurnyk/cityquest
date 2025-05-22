import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ProfileStatsProps {
  completedQuests: number;
  visitedLocations: number;
  achievements: number;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({
  completedQuests,
  visitedLocations,
  achievements,
}) => {
  const { theme: currentTheme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.statItem}>
        <Icon name='flag' size={24} color={currentTheme.colors.primary} />
        <Text style={[styles.statValue, { color: currentTheme.colors.text }]}>
          {completedQuests}
        </Text>
        <Text style={[styles.statLabel, { color: currentTheme.colors.muted }]}>
          Квестов
        </Text>
      </View>

      <View style={styles.statItem}>
        <Icon name='place' size={24} color={currentTheme.colors.primary} />
        <Text style={[styles.statValue, { color: currentTheme.colors.text }]}>
          {visitedLocations}
        </Text>
        <Text style={[styles.statLabel, { color: currentTheme.colors.muted }]}>
          Мест
        </Text>
      </View>

      <View style={styles.statItem}>
        <Icon
          name='emoji-events'
          size={24}
          color={currentTheme.colors.primary}
        />
        <Text style={[styles.statValue, { color: currentTheme.colors.text }]}>
          {achievements}
        </Text>
        <Text style={[styles.statLabel, { color: currentTheme.colors.muted }]}>
          Достижений
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E5E7EB',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 14,
    marginTop: 2,
  },
});
