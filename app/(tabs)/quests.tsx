/**
 * Экран квестов
 */
import { MaterialIcons } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import QuestCard from '@/components/QuestCard';
import StateView from '@/components/StateView';
import { useColorScheme } from '@/components/useColorScheme';
import Colors, { type ThemeColors } from '@/constants/Colors';
import { useQuests, useQuestsStats } from '@/hooks/queries/useQuests';
import { getErrorMessage } from '@/lib/errors';
import { getQuestProgress } from '@/services/questsService';
import { Quest } from '@/types';

// visitedPlaces не предоставляется API — используем пустой массив
const visitedPlaces: string[] = [];

export default function QuestsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const styles = useMemo(() => createStyles(colors), [colors]);
  const insets = useSafeAreaInsets();

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const questsQuery = useQuests();
  const statsQuery = useQuestsStats(visitedPlaces);

  const quests = questsQuery.data ?? [];
  const stats = statsQuery.data;
  const loading = questsQuery.isLoading || statsQuery.isLoading;
  const refreshing = questsQuery.isRefetching || statsQuery.isRefetching;
  const isError = questsQuery.isError || statsQuery.isError;

  const onRefresh = () => {
    questsQuery.refetch();
    statsQuery.refetch();
  };

  const getFilteredQuests = () => {
    return quests.filter((quest) => {
      const progress = getQuestProgress(quest.id, visitedPlaces);
      const isCompleted = progress.percent === 100;
      const isActive = progress.percent > 0 && progress.percent < 100;

      switch (filter) {
        case 'active':
          return isActive;
        case 'completed':
          return isCompleted;
        default:
          return true;
      }
    });
  };

  const handleQuestPress = (quest: Quest) => {
    // TODO: Навигация на детальный экран квеста
    console.log('Quest pressed:', quest.id);
  };

  if (loading) {
    return (
      <View style={[styles.centered, { backgroundColor: colors.background }]}>
        <ActivityIndicator size='large' color={colors.tint} />
      </View>
    );
  }

  const filteredQuests = getFilteredQuests();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Заголовок со статистикой */}
      <View
        style={[
          styles.header,
          { backgroundColor: colors.tint, paddingTop: insets.top + 12 },
        ]}
      >
        <Text style={styles.headerTitle}>Квесты</Text>
        {stats && (
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.completed}</Text>
              <Text style={styles.statLabel}>Завершено</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.inProgress}</Text>
              <Text style={styles.statLabel}>В процессе</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.earnedReward}</Text>
              <Text style={styles.statLabel}>Заработано ✨</Text>
            </View>
          </View>
        )}
      </View>

      {isError ? (
        <StateView
          icon='cloud-off'
          title='Не удалось загрузить квесты'
          message={getErrorMessage(questsQuery.error ?? statsQuery.error)}
          actionLabel='Повторить'
          onAction={onRefresh}
        />
      ) : quests.length === 0 ? (
        <StateView
          icon='explore'
          title='Квесты скоро появятся'
          message='Мы готовим маршруты по городу. А пока открывайте места на карте.'
        />
      ) : (
        <>
          {/* Фильтры */}
          <View style={styles.filters}>
            {(['all', 'active', 'completed'] as const).map((f) => (
              <TouchableOpacity
                key={f}
                style={[
                  styles.filterButton,
                  filter === f && { backgroundColor: colors.tint },
                ]}
                onPress={() => setFilter(f)}
              >
                <Text
                  style={[
                    styles.filterText,
                    filter === f && styles.filterTextActive,
                  ]}
                >
                  {f === 'all'
                    ? 'Все'
                    : f === 'active'
                      ? 'Активные'
                      : 'Завершённые'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Список квестов */}
          <ScrollView
            style={styles.list}
            contentContainerStyle={styles.listContent}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {filteredQuests.length === 0 ? (
              <View style={styles.emptyState}>
                <MaterialIcons
                  name='explore'
                  size={64}
                  color={colors.tabIconDefault}
                />
                <Text
                  style={[styles.emptyText, { color: colors.textSecondary }]}
                >
                  {filter === 'completed'
                    ? 'Пока нет завершённых квестов'
                    : filter === 'active'
                      ? 'Нет активных квестов'
                      : 'Квесты не найдены'}
                </Text>
              </View>
            ) : (
              filteredQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  progress={getQuestProgress(quest.id, visitedPlaces)}
                  onPress={handleQuestPress}
                />
              ))
            )}
          </ScrollView>
        </>
      )}
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    centered: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      paddingBottom: 20,
      paddingHorizontal: 20,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: '700',
      color: '#fff',
      marginBottom: 16,
    },
    statsRow: {
      flexDirection: 'row',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: 16,
      padding: 14,
    },
    statItem: {
      flex: 1,
      alignItems: 'center',
    },
    statValue: {
      fontSize: 22,
      fontWeight: '700',
      color: '#fff',
    },
    statLabel: {
      fontSize: 12,
      color: 'rgba(255, 255, 255, 0.8)',
      marginTop: 4,
    },
    statDivider: {
      width: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      marginHorizontal: 10,
    },
    filters: {
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 16,
      gap: 8,
    },
    filterButton: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      backgroundColor: colors.card,
    },
    filterText: {
      fontSize: 14,
      fontWeight: '500',
      color: colors.textSecondary,
    },
    filterTextActive: {
      color: '#fff',
    },
    list: {
      flex: 1,
    },
    listContent: {
      paddingHorizontal: 16,
      paddingBottom: 100,
    },
    emptyState: {
      alignItems: 'center',
      paddingTop: 60,
    },
    emptyText: {
      fontSize: 16,
      marginTop: 16,
      textAlign: 'center',
    },
  });
