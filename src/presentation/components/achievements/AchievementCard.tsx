import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Achievement } from '@/domain/entities/Achievement';
import { theme } from '@/presentation/theme';

interface AchievementCardProps {
  achievement: Achievement;
  onPress: (achievement: Achievement) => void;
}

type RarityStyle = 'common' | 'rare' | 'epic' | 'legendary';

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onPress,
}) => {
  const progress =
    (achievement.progress.current / achievement.progress.total) * 100;
  const rarityStyle = achievement.rarity.toLowerCase() as RarityStyle;

  return (
    <TouchableOpacity
      style={[styles.container, styles[rarityStyle]]}
      onPress={() => onPress(achievement)}
    >
      <Image source={{ uri: achievement.icon }} style={styles.icon} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{achievement.title}</Text>
          <Text style={styles.rarity}>{achievement.rarity}</Text>
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {achievement.description}
        </Text>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
          <Text style={styles.progressText}>
            {achievement.progress.current}/{achievement.progress.total}
          </Text>
        </View>
        <Text style={styles.reward}>+{achievement.rewards.experience} XP</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    ...theme.shadows.md,
  },
  common: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.muted,
  },
  rare: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  epic: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.secondary,
  },
  legendary: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.accent,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: theme.spacing.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  title: {
    ...theme.typography.h2,
    color: theme.colors.text,
  },
  rarity: {
    ...theme.typography.small,
    color: theme.colors.muted,
    textTransform: 'uppercase',
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.muted,
    marginBottom: theme.spacing.sm,
  },
  progressContainer: {
    height: 4,
    backgroundColor: theme.colors.background,
    borderRadius: 2,
    marginBottom: theme.spacing.sm,
    position: 'relative',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
  },
  progressText: {
    ...theme.typography.small,
    color: theme.colors.muted,
    textAlign: 'right',
  },
  reward: {
    ...theme.typography.small,
    color: theme.colors.accent,
    fontWeight: '600',
  },
});
