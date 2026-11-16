/**
 * Виджет стрика
 */
import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../constants/Colors';
import { Streak } from '../types';

interface StreakWidgetProps {
  streak: Streak;
  compact?: boolean;
}

export default function StreakWidget({
  streak,
  compact = false,
}: StreakWidgetProps) {
  const hasStreak = streak.currentStreak > 0;

  if (compact) {
    return (
      <View style={styles.compactContainer}>
        <MaterialIcons
          name='local-fire-department'
          size={18}
          color={
            hasStreak ? Colors.rarity.legendary : Colors.light.tabIconDefault
          }
        />
        <Text style={[styles.compactValue, hasStreak && styles.activeStreak]}>
          {streak.currentStreak}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons
          name='local-fire-department'
          size={28}
          color={
            hasStreak ? Colors.rarity.legendary : Colors.light.tabIconDefault
          }
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>Серия посещений</Text>
          {streak.multiplier > 1 && (
            <View style={styles.multiplierBadge}>
              <Text style={styles.multiplierText}>x{streak.multiplier}</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={[styles.statValue, hasStreak && styles.activeStreak]}>
            {streak.currentStreak}
          </Text>
          <Text style={styles.statLabel}>Текущая</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.stat}>
          <Text style={styles.statValue}>{streak.longestStreak}</Text>
          <Text style={styles.statLabel}>Рекорд</Text>
        </View>
      </View>

      {!hasStreak && (
        <Text style={styles.hint}>
          Посетите место сегодня, чтобы начать серию!
        </Text>
      )}

      {streak.multiplier > 1 && (
        <View style={styles.bonusInfo}>
          <MaterialIcons name='bolt' size={16} color={Colors.light.success} />
          <Text style={styles.bonusText}>
            Бонус x{streak.multiplier} ко всем очкам!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.card,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  compactValue: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.light.tabIconDefault,
  },
  activeStreak: {
    color: Colors.rarity.legendary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    gap: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: Colors.light.text,
  },
  multiplierBadge: {
    backgroundColor: Colors.light.success + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  multiplierText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.light.success,
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.light.text,
  },
  statLabel: {
    fontSize: 13,
    color: Colors.light.tabIconDefault,
    marginTop: 4,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.light.border,
  },
  hint: {
    fontSize: 13,
    color: Colors.light.tabIconDefault,
    textAlign: 'center',
    marginTop: 12,
  },
  bonusInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.success + '15',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 12,
    gap: 6,
  },
  bonusText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.light.success,
  },
});
