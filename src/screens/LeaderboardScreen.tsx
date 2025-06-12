import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { User } from '@/domain/entities/User';
import { theme } from '@/presentation/theme';

const mockUsers: User[] = [
  {
    id: '1',
    username: 'JohnDoe',
    email: 'john@example.com',
    level: 10,
    experience: 5000,
    achievements: [],
    quests: [],
    avatar: 'https://example.com/avatar1.jpg',
    stats: {
      questsCompleted: 0,
      achievementsUnlocked: 0,
      totalPoints: 0,
      distanceWalked: 0,
    },
    settings: {
      notifications: true,
      darkMode: false,
      language: 'ru',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    username: 'JaneSmith',
    email: 'jane@example.com',
    level: 8,
    experience: 3500,
    achievements: [],
    quests: [],
    avatar: 'https://example.com/avatar2.jpg',
    stats: {
      questsCompleted: 0,
      achievementsUnlocked: 0,
      totalPoints: 0,
      distanceWalked: 0,
    },
    settings: {
      notifications: true,
      darkMode: false,
      language: 'ru',
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const LeaderboardScreen = () => {
  const renderItem = ({ item, index }: { item: User; index: number }) => (
    <View style={styles.item}>
      <Text style={styles.rank}>#{index + 1}</Text>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.level}>Уровень {item.level}</Text>
      <Text style={styles.xp}>{item.experience} XP</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Таблица лидеров</Text>
      <FlatList
        data={mockUsers}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  title: {
    ...theme.typography.h1,
    color: theme.colors.text,
    padding: theme.spacing.lg,
  },
  list: {
    padding: theme.spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
  },
  rank: {
    ...theme.typography.h2,
    color: theme.colors.primary,
    marginRight: theme.spacing.md,
  },
  username: {
    ...theme.typography.body,
    color: theme.colors.text,
    flex: 1,
  },
  level: {
    ...theme.typography.small,
    color: theme.colors.muted,
    marginRight: theme.spacing.md,
  },
  xp: {
    ...theme.typography.small,
    color: theme.colors.accent,
    fontWeight: '600',
  },
});

export default LeaderboardScreen;
