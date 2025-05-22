import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Quest } from '@/domain/entities/Quest';
import { theme } from '@/presentation/theme';

interface QuestCardProps {
  quest: Quest;
  onPress: (quest: Quest) => void;
}

type QuestStatusStyle = 'active' | 'completed' | 'locked';

export const QuestCard: React.FC<QuestCardProps> = ({ quest, onPress }) => {
  const statusStyle = quest.status.toLowerCase() as QuestStatusStyle;

  return (
    <TouchableOpacity
      style={[styles.container, styles[statusStyle]]}
      onPress={() => onPress(quest)}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{quest.title}</Text>
        <Text style={styles.points}>{quest.points} pts</Text>
      </View>
      <Text style={styles.description} numberOfLines={2}>
        {quest.description}
      </Text>
      <View style={styles.footer}>
        <Text style={styles.type}>{quest.type}</Text>
        <Text style={styles.reward}>+{quest.rewards.experience} XP</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  active: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  completed: {
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.accent,
  },
  locked: {
    opacity: 0.7,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  points: {
    fontSize: 16,
    color: theme.colors.accent,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: theme.colors.muted,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  type: {
    fontSize: 12,
    color: theme.colors.primary,
    textTransform: 'uppercase',
  },
  reward: {
    fontSize: 12,
    color: theme.colors.accent,
    fontWeight: '600',
  },
});
