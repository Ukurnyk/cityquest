/**
 * Строка лидерборда
 */
import { MaterialIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useColorScheme } from '@/components/useColorScheme';
import Colors, { type ThemeColors } from '../constants/Colors';
import { LeaderboardEntry } from '../types';

interface LeaderboardItemProps {
  entry: LeaderboardEntry;
  isCurrentUser?: boolean;
}

const rankColors: Record<number, string> = {
  1: Colors.rarity.legendary,
  2: '#C0C0C0',
  3: '#CD7F32',
};

const rankIcons: Record<number, keyof typeof MaterialIcons.glyphMap> = {
  1: 'emoji-events',
  2: 'military-tech',
  3: 'workspace-premium',
};

export default function LeaderboardItem({
  entry,
  isCurrentUser = false,
}: LeaderboardItemProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const styles = useMemo(() => createStyles(colors), [colors]);
  const isTopThree = entry.rank <= 3;

  return (
    <View
      style={[styles.container, isCurrentUser && styles.currentUserContainer]}
    >
      {/* Ранг */}
      <View
        style={[
          styles.rankContainer,
          isTopThree && { backgroundColor: rankColors[entry.rank] + '20' },
        ]}
      >
        {isTopThree ? (
          <MaterialIcons
            name={rankIcons[entry.rank]}
            size={20}
            color={rankColors[entry.rank]}
          />
        ) : (
          <Text style={styles.rankText}>{entry.rank}</Text>
        )}
      </View>

      {/* Аватар */}
      {entry.avatar ? (
        <Image source={{ uri: entry.avatar }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {entry.name.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}

      {/* Информация */}
      <View style={styles.info}>
        <Text style={[styles.name, isCurrentUser && styles.currentUserName]}>
          {entry.name}
          {isCurrentUser && ' (Вы)'}
        </Text>
        <View style={styles.details}>
          <MaterialIcons name='stars' size={14} color={Colors.rarity.rare} />
          <Text style={styles.level}>Ур. {entry.level}</Text>
          <Text style={styles.separator}>•</Text>
          <Text style={styles.places}>{entry.visitedPlacesCount} мест</Text>
        </View>
      </View>

      {/* Очки */}
      <View style={styles.pointsContainer}>
        <Text
          style={[
            styles.points,
            isTopThree && { color: rankColors[entry.rank] },
          ]}
        >
          {entry.totalPoints}
        </Text>
        <Text style={styles.pointsLabel}>очков</Text>
      </View>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: 14,
      padding: 12,
      marginBottom: 8,
    },
    currentUserContainer: {
      borderWidth: 2,
      borderColor: colors.tint,
      backgroundColor: colors.tint + '08',
    },
    rankContainer: {
      width: 36,
      height: 36,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.card,
      marginRight: 10,
    },
    rankText: {
      fontSize: 15,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      marginRight: 12,
    },
    avatarPlaceholder: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.tint + '20',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    avatarText: {
      fontSize: 18,
      fontWeight: '600',
      color: colors.tint,
    },
    info: {
      flex: 1,
    },
    name: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 4,
    },
    currentUserName: {
      color: colors.tint,
    },
    details: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    level: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    separator: {
      color: colors.textSecondary,
      fontSize: 12,
    },
    places: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    pointsContainer: {
      alignItems: 'flex-end',
    },
    points: {
      fontSize: 17,
      fontWeight: '700',
      color: colors.text,
    },
    pointsLabel: {
      fontSize: 11,
      color: colors.textSecondary,
    },
  });
