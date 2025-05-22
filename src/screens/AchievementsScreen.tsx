import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useTheme } from '@/theme/ThemeContext';
import { AchievementCard } from '@/presentation/components/achievements/AchievementCard';
import { useSafeArea } from '@/theme/SafeAreaContext';
import { Achievement } from '@/domain/entities/Achievement';

const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Первые шаги',
    description: 'Завершите свой первый квест',
    icon: 'https://example.com/icon1.png',
    rarity: 'COMMON',
    type: 'QUEST',
    progress: {
      current: 1,
      total: 1,
    },
    rewards: {
      experience: 100,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    title: 'Исследователь',
    description: 'Посетите 5 разных локаций',
    icon: 'https://example.com/icon2.png',
    rarity: 'RARE',
    type: 'EXPLORER',
    progress: {
      current: 3,
      total: 5,
    },
    rewards: {
      experience: 250,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const AchievementsScreen = () => {
  const { theme: currentTheme } = useTheme();
  const { topPadding, bottomPadding } = useSafeArea();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={[
          styles.container,
          { backgroundColor: currentTheme.colors.background },
        ]}
        contentContainerStyle={[
          styles.content,
          { paddingTop: topPadding, paddingBottom: bottomPadding },
        ]}
      >
        {mockAchievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            onPress={() => {}}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
  },
});

export default AchievementsScreen;
