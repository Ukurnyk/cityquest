import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { LeaderboardEntry } from '@/types';

// Временные данные для тестирования
const mockLeaderboard: LeaderboardEntry[] = [
  {
    userId: '1',
    username: 'Иван Петров',
    avatar: 'https://via.placeholder.com/50',
    xp: 1250,
    rank: 1,
    achievementsCount: 15,
  },
  {
    userId: '2',
    username: 'Мария Иванова',
    avatar: 'https://via.placeholder.com/50',
    xp: 1100,
    rank: 2,
    achievementsCount: 12,
  },
  {
    userId: '3',
    username: 'Алексей Сидоров',
    avatar: 'https://via.placeholder.com/50',
    xp: 950,
    rank: 3,
    achievementsCount: 10,
  },
];

export const LeaderboardScreen = () => {
  const renderItem = ({ item }: { item: LeaderboardEntry }) => (
    <View style={styles.leaderboardItem}>
      <Text style={styles.rank}>#{item.rank}</Text>
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.username}>{item.username}</Text>
        <Text style={styles.achievements}>
          {item.achievementsCount} достижений
        </Text>
      </View>
      <Text style={styles.xp}>{item.xp} XP</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Топ исследователей</Text>
      </View>
      <FlatList
        data={mockLeaderboard}
        renderItem={renderItem}
        keyExtractor={(item) => item.userId}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B2D42',
  },
  list: {
    padding: 16,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B6CFF',
    width: 40,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2D42',
    marginBottom: 4,
  },
  achievements: {
    fontSize: 14,
    color: '#7B7F9E',
  },
  xp: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B6CFF',
  },
});

export default LeaderboardScreen;
