import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { User, Badge } from '@/types';
import { useTheme } from '@/theme/ThemeContext';

// Временные данные для тестирования
const mockUser: User = {
  id: '1',
  username: 'Иван Петров',
  email: 'ivan@example.com',
  avatar: 'https://via.placeholder.com/150',
  xp: 1250,
  level: 5,
  achievements: [],
  badges: [
    {
      id: '1',
      title: 'Первые шаги',
      description: 'Выполнил первое достижение',
      icon: '🏆',
      rarity: 'common',
      unlockedAt: new Date(),
    },
    {
      id: '2',
      title: 'Исследователь',
      description: 'Посетил 10 разных мест',
      icon: '🗺️',
      rarity: 'rare',
      unlockedAt: new Date(),
    },
  ],
};

export const ProfileScreen = () => {
  const { theme } = useTheme();
  const renderBadge = (badge: Badge) => (
    <View key={badge.id} style={styles.badgeContainer}>
      <Text style={styles.badgeIcon}>{badge.icon}</Text>
      <View style={styles.badgeInfo}>
        <Text style={styles.badgeTitle}>{badge.title}</Text>
        <Text style={styles.badgeDescription}>{badge.description}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <Image source={{ uri: mockUser.avatar }} style={styles.avatar} />
        <Text style={[styles.username, { color: theme.colors.text }]}>
          {mockUser.username}
        </Text>
        <View style={styles.levelContainer}>
          <Text style={[styles.levelText, { color: theme.colors.muted }]}>
            Уровень {mockUser.level}
          </Text>
          <View style={styles.xpBar}>
            <View
              style={[
                styles.xpProgress,
                {
                  width: `${(mockUser.xp % 1000) / 10}%`,
                  backgroundColor: theme.colors.primary,
                },
              ]}
            />
          </View>
          <Text style={[styles.xpText, { color: theme.colors.muted }]}>
            {mockUser.xp} XP
          </Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Достижения
        </Text>
        {mockUser.badges.map(renderBadge)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2B2D42',
    marginBottom: 8,
  },
  levelContainer: {
    width: '100%',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 16,
    color: '#7B7F9E',
    marginBottom: 8,
  },
  xpBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 8,
  },
  xpProgress: {
    height: '100%',
    backgroundColor: '#4B6CFF',
    borderRadius: 4,
  },
  xpText: {
    fontSize: 14,
    color: '#7B7F9E',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B2D42',
    marginBottom: 16,
  },
  badgeContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  badgeIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  badgeInfo: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2B2D42',
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 14,
    color: '#7B7F9E',
  },
});

export default ProfileScreen;
