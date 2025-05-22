import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Achievement } from '@/types';

interface AchievementHeaderProps {
  achievement: Achievement;
}

export const AchievementHeader: React.FC<AchievementHeaderProps> = ({
  achievement,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{achievement.title}</Text>
      <View style={styles.xpContainer}>
        <Text style={styles.xpText}>+{achievement.xpReward} XP</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B2D42',
    marginBottom: 8,
  },
  xpContainer: {
    backgroundColor: '#4B6CFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  xpText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
