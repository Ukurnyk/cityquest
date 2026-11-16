/**
 * Карточка квеста
 */
import { MaterialIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors, { type ThemeColors } from '../constants/Colors';
import { Quest } from '../types';

interface QuestCardProps {
  quest: Quest;
  progress: { completed: number; total: number; percent: number };
  onPress?: (quest: Quest) => void;
}

const difficultyColors = {
  easy: Colors.light.success,
  medium: Colors.rarity.rare,
  hard: Colors.rarity.epic,
};

const difficultyLabels = {
  easy: 'Лёгкий',
  medium: 'Средний',
  hard: 'Сложный',
};

export default function QuestCard({
  quest,
  progress,
  onPress,
}: QuestCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const styles = useMemo(() => createStyles(colors), [colors]);
  const isCompleted = quest.isCompleted || progress.percent === 100;

  return (
    <TouchableOpacity
      style={[styles.container, isCompleted && styles.completedContainer]}
      onPress={() => onPress?.(quest)}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name={quest.icon as any}
            size={28}
            color={isCompleted ? colors.success : colors.tint}
          />
        </View>

        <View style={styles.headerInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {quest.title}
            </Text>
            {isCompleted && (
              <MaterialIcons
                name='check-circle'
                size={20}
                color={colors.success}
              />
            )}
          </View>

          <View style={styles.badges}>
            <View
              style={[
                styles.difficultyBadge,
                { backgroundColor: difficultyColors[quest.difficulty] + '20' },
              ]}
            >
              <Text
                style={[
                  styles.difficultyText,
                  { color: difficultyColors[quest.difficulty] },
                ]}
              >
                {difficultyLabels[quest.difficulty]}
              </Text>
            </View>

            <View style={styles.rewardBadge}>
              <Text style={styles.rewardText}>+{quest.reward} ✨</Text>
            </View>
          </View>
        </View>
      </View>

      <Text style={styles.description} numberOfLines={2}>
        {quest.description}
      </Text>

      {/* Прогресс */}
      <View style={styles.progressSection}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressLabel}>
            {progress.completed} / {progress.total} мест
          </Text>
          <Text style={styles.progressPercent}>{progress.percent}%</Text>
        </View>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progress.percent}%`,
                backgroundColor: isCompleted ? colors.success : colors.tint,
              },
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.surface,
      borderRadius: 16,
      padding: 16,
      marginBottom: 12,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    completedContainer: {
      opacity: 0.8,
      borderWidth: 2,
      borderColor: colors.success + '40',
    },
    header: {
      flexDirection: 'row',
      marginBottom: 12,
    },
    iconContainer: {
      width: 50,
      height: 50,
      borderRadius: 12,
      backgroundColor: colors.card,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    headerInfo: {
      flex: 1,
    },
    titleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      marginBottom: 6,
    },
    title: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text,
      flex: 1,
    },
    badges: {
      flexDirection: 'row',
      gap: 8,
    },
    difficultyBadge: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
    },
    difficultyText: {
      fontSize: 12,
      fontWeight: '600',
    },
    rewardBadge: {
      backgroundColor: colors.tint + '15',
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 12,
    },
    rewardText: {
      fontSize: 12,
      fontWeight: '600',
      color: colors.tint,
    },
    description: {
      fontSize: 14,
      color: colors.textSecondary,
      lineHeight: 20,
      marginBottom: 14,
    },
    progressSection: {},
    progressHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 6,
    },
    progressLabel: {
      fontSize: 13,
      color: colors.textSecondary,
    },
    progressPercent: {
      fontSize: 13,
      fontWeight: '600',
      color: colors.text,
    },
    progressBar: {
      height: 8,
      backgroundColor: colors.border,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 4,
    },
  });
