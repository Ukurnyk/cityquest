import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Achievement } from '@/types';

interface AchievementInfoProps {
  achievement: Achievement;
}

export const AchievementInfo: React.FC<AchievementInfoProps> = ({
  achievement,
}) => {
  return (
    <View style={styles.infoContainer}>
      <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>Тип</Text>
        <Text style={styles.infoValue}>
          {achievement.type === 'location' ? 'Место' : 'Событие'}
        </Text>
      </View>

      <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>Статус</Text>
        <Text
          style={[
            styles.infoValue,
            { color: achievement.isCompleted ? '#4CAF50' : '#FF6B4A' },
          ]}
        >
          {achievement.isCompleted ? 'Выполнено' : 'В процессе'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#7B7F9E',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2B2D42',
  },
});
