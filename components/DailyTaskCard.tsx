/**
 * Карточка ежедневного задания
 */
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { DailyTask } from '../types';

interface DailyTaskCardProps {
  task: DailyTask;
  compact?: boolean;
}

const taskIcons: Record<
  DailyTask['type'],
  keyof typeof MaterialIcons.glyphMap
> = {
  visit: 'place',
  photo: 'camera-alt',
  quest_progress: 'map',
  checkin: 'qr-code-scanner',
  share: 'share',
};

export default function DailyTaskCard({
  task,
  compact = false,
}: DailyTaskCardProps) {
  const progressPercent = Math.min(
    100,
    Math.round((task.progress / task.target) * 100),
  );

  return (
    <View style={[styles.container, compact && styles.containerCompact]}>
      <View
        style={[
          styles.iconContainer,
          task.isCompleted && styles.iconContainerCompleted,
        ]}
      >
        {task.isCompleted ? (
          <MaterialIcons name='check' size={20} color='#fff' />
        ) : (
          <MaterialIcons
            name={taskIcons[task.type]}
            size={20}
            color={Colors.light.tint}
          />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[styles.title, task.isCompleted && styles.titleCompleted]}
            numberOfLines={1}
          >
            {task.title}
          </Text>
          <Text style={styles.points}>+{task.points}</Text>
        </View>

        {!compact && task.description && (
          <Text style={styles.description} numberOfLines={1}>
            {task.description}
          </Text>
        )}

        {!task.isCompleted && (
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${progressPercent}%` }]}
              />
            </View>
            <Text style={styles.progressText}>
              {task.progress}/{task.target}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.light.background,
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  containerCompact: {
    padding: 12,
    marginBottom: 8,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.light.tint + '15',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconContainerCompleted: {
    backgroundColor: Colors.light.success,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.light.text,
    flex: 1,
    marginRight: 8,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: Colors.light.tabIconDefault,
  },
  points: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.light.tint,
  },
  description: {
    fontSize: 13,
    color: Colors.light.tabIconDefault,
    marginBottom: 8,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.light.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.light.tint,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: Colors.light.tabIconDefault,
    width: 30,
    textAlign: 'right',
  },
});
