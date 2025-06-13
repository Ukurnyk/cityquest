import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Achievement } from '@/domain/entities/Achievement';
import { theme } from '@/presentation/theme';

interface AchievementCardProps {
  achievement: Achievement;
  onPress: (achievement: Achievement) => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, achievement.isPartner && styles.partner]}
      onPress={() => onPress(achievement)}
    >
      <Image source={{ uri: achievement.iconUrl }} style={styles.icon} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{achievement.title}</Text>
          {achievement.isPartner && (
            <Text style={styles.partnerBadge}>Партнер</Text>
          )}
        </View>
        <Text style={styles.description} numberOfLines={2}>
          {achievement.description}
        </Text>
        <View style={styles.rewardContainer}>
          <Text style={styles.reward}>+{achievement.rewardScore} очков</Text>
        </View>
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
  partner: {
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
  partnerBadge: {
    ...theme.typography.caption,
    color: theme.colors.accent,
    textTransform: 'uppercase',
  },
  description: {
    ...theme.typography.body,
    color: theme.colors.muted,
    marginBottom: theme.spacing.sm,
  },
  rewardContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  reward: {
    ...theme.typography.caption,
    color: theme.colors.accent,
    fontWeight: '600',
  },
});
