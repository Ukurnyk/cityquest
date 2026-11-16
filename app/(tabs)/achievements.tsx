/**
 * Экран достижений
 */
import React, { useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import AchievementCard from '@/components/AchievementCard';
import StateView from '@/components/StateView';
import { useColorScheme } from '@/components/useColorScheme';
import Colors from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useAchievementsScreen } from '@/hooks/queries/useAchievements';
import { getErrorMessage } from '@/lib/errors';
import { ApiAchievement } from '@/types';

type FilterType = 'all' | 'unlocked' | 'locked';

const emptyStates: Record<FilterType, { title: string; message: string }> = {
  all: {
    title: 'Ачивок пока нет',
    message: 'Скоро здесь появятся задания для вашего города',
  },
  unlocked: {
    title: 'Нет открытых ачивок',
    message: 'Посетите место на карте, чтобы получить первую',
  },
  locked: {
    title: 'Все ачивки открыты',
    message: 'Вы собрали всё, что есть в городе',
  },
};

export default function AchievementsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = useAuth();

  const [filter, setFilter] = useState<FilterType>('all');

  const {
    achievements,
    completedIds,
    stats,
    isLoading,
    isRefetching,
    isError,
    error,
    refetch,
  } = useAchievementsScreen(user?.id);

  const onRefresh = () => {
    refetch();
  };

  const filteredAchievements = achievements.filter((ach) => {
    if (filter === 'unlocked') return completedIds.has(ach.id);
    if (filter === 'locked') return !completedIds.has(ach.id);
    return true;
  });

  const handleAchievementPress = (achievement: ApiAchievement) => {
    console.log('Achievement pressed:', achievement.title);
  };

  const renderFilter = (type: FilterType, label: string) => {
    const isSelected = filter === type;
    return (
      <TouchableOpacity
        style={[
          styles.filterButton,
          {
            backgroundColor: isSelected ? colors.tint : 'transparent',
            borderColor: isSelected ? colors.tint : colors.border,
          },
        ]}
        onPress={() => setFilter(type)}
      >
        <Text
          style={[
            styles.filterLabel,
            { color: isSelected ? '#FFF' : colors.textSecondary },
          ]}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size='large' color={colors.tint} />
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <StateView
          icon='cloud-off'
          title='Не удалось загрузить ачивки'
          message={getErrorMessage(error)}
          actionLabel='Повторить'
          onAction={refetch}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Статистика */}
      <View style={[styles.statsContainer, { backgroundColor: colors.card }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.tint }]}>
            {stats.unlocked}/{stats.total}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Получено
          </Text>
        </View>

        <View
          style={[styles.statDivider, { backgroundColor: colors.border }]}
        />

        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.success }]}>
            {stats.earnedPoints}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Очков
          </Text>
        </View>

        <View
          style={[styles.statDivider, { backgroundColor: colors.border }]}
        />

        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: Colors.rarity.legendary }]}>
            {stats.total > 0
              ? Math.round((stats.unlocked / stats.total) * 100)
              : 0}
            %
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>
            Прогресс
          </Text>
        </View>
      </View>

      {/* Фильтры */}
      <View style={styles.filtersContainer}>
        {renderFilter('all', `Все (${achievements.length})`)}
        {renderFilter('unlocked', `Открыто (${stats.unlocked})`)}
        {renderFilter('locked', `Закрыто (${stats.total - stats.unlocked})`)}
      </View>

      {/* Список достижений */}
      {filteredAchievements.length === 0 ? (
        <StateView icon='emoji-events' {...emptyStates[filter]} />
      ) : (
        <FlatList
          data={filteredAchievements}
          renderItem={({ item }) => (
            <AchievementCard
              achievement={{
                id: item.id,
                title: item.title,
                description: item.description,
                icon: item.iconUrl ?? '🏆',
                unlocked: completedIds.has(item.id),
                points: item.rewardScore,
                rarity: 'common',
              }}
              onPress={() => handleAchievementPress(item)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.achievementsList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    margin: 16,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
  },
  filtersContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginBottom: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  achievementsList: {
    padding: 16,
  },
});
