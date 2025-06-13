import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Achievement } from '@/domain/entities/Achievement';
import { theme } from '@/presentation/theme';

interface AchievementHeaderProps {
  achievement: Achievement;
}

export const AchievementHeader: React.FC<AchievementHeaderProps> = ({
  achievement,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{achievement.title}</Text>
      <View style={styles.rewardContainer}>
        <Text style={styles.rewardText}>+{achievement.rewardScore} очков</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
  },
  rewardContainer: {
    backgroundColor: theme.colors.accent,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
  },
  rewardText: {
    ...theme.typography.caption,
    color: theme.colors.card,
    fontWeight: '600',
  },
});
