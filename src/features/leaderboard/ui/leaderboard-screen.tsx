import React from 'react';
import { FlatList } from 'react-native';
import { YStack, Text, XStack, Card, Avatar } from 'tamagui';
import { Ionicons } from '@expo/vector-icons';
import { User } from '@/domain/entities/User';

const mockUsers: User[] = [
  {
    id: '1',
    username: 'JohnDoe',
    email: 'john@example.com',
    level: 10,
    experience: 5000,
    achievements: [],
    quests: [],
    avatarUrl: 'https://example.com/avatar1.jpg',
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
    createdAt: '2024-01-01',
    updatedAt: new Date(),
    isBlocked: false,
    isAdmin: false,
  },
  {
    id: '2',
    username: 'JaneSmith',
    email: 'jane@example.com',
    level: 8,
    experience: 3500,
    achievements: [],
    quests: [],
    avatarUrl: 'https://example.com/avatar2.jpg',
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
    createdAt: '2024-01-01',
    updatedAt: new Date(),
    isBlocked: false,
    isAdmin: false,
  },
];

const LeaderboardItem: React.FC<{ user: User; index: number }> = ({
  user,
  index,
}) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 0:
        return <Ionicons name='trophy' size={24} color='#FFD700' />;
      case 1:
        return <Ionicons name='medal' size={24} color='#C0C0C0' />;
      case 2:
        return <Ionicons name='medal' size={24} color='#CD7F32' />;
      default:
        return (
          <Text fontSize='$4' fontWeight='600' color='$blue10'>
            #{rank + 1}
          </Text>
        );
    }
  };

  return (
    <Card padding='$4' marginBottom='$3' backgroundColor='$background'>
      <XStack space='$3' alignItems='center'>
        {getRankIcon(index)}
        <Avatar circular size='$5'>
          <Avatar.Image src={user.avatarUrl || undefined} />
          <Avatar.Fallback backgroundColor='$gray5'>
            <Ionicons name='person' size={20} />
          </Avatar.Fallback>
        </Avatar>
        <YStack flex={1}>
          <Text fontSize='$5' fontWeight='600'>
            {user.username}
          </Text>
          <Text fontSize='$3' color='$gray11'>
            Уровень {user.level}
          </Text>
        </YStack>
        <Text fontSize='$4' color='$green10' fontWeight='600'>
          {user.experience} XP
        </Text>
      </XStack>
    </Card>
  );
};

export const LeaderboardScreen: React.FC = () => {
  return (
    <YStack flex={1} padding='$4' backgroundColor='$background'>
      <Text fontSize='$8' fontWeight='700' marginBottom='$4'>
        Таблица лидеров
      </Text>
      <FlatList
        data={mockUsers}
        renderItem={({ item, index }) => (
          <LeaderboardItem user={item} index={index} />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </YStack>
  );
};
