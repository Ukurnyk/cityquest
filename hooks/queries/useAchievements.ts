/**
 * Query-хуки для работы с достижениями
 */
import {
  calcEarnedScore,
  getCityAchievements,
  getCompletedAchievements,
  getUserAchievements,
} from '@/services/achievementsService';
import { ApiAchievement, UserAchievement } from '@/types';
import { useQuery } from '@tanstack/react-query';

const DEFAULT_CITY_ID = '00000000-0000-0000-0000-000000000001';

// ─── Ключи запросов ──────────────────────────────────────────────────────────

export const achievementKeys = {
  city: (cityId: string) => ['achievements', 'city', cityId] as const,
  userAll: (userId: string) => ['achievements', 'user', userId] as const,
  userCompleted: (userId: string) =>
    ['achievements', 'user', userId, 'completed'] as const,
};

// ─── Хуки ────────────────────────────────────────────────────────────────────

/** Достижения города */
export function useCityAchievements(
  cityId: string = DEFAULT_CITY_ID,
  page = 1,
  pageSize = 100,
) {
  return useQuery({
    queryKey: achievementKeys.city(cityId),
    queryFn: () => getCityAchievements(cityId, page, pageSize),
  });
}

/** Завершённые достижения пользователя */
export function useCompletedAchievements(userId: string | undefined) {
  return useQuery<UserAchievement[]>({
    queryKey: achievementKeys.userCompleted(userId ?? ''),
    queryFn: () => getCompletedAchievements(userId!),
    enabled: !!userId,
  });
}

/** Все достижения пользователя (с прогрессом) */
export function useUserAchievements(userId: string | undefined) {
  return useQuery<UserAchievement[]>({
    queryKey: achievementKeys.userAll(userId ?? ''),
    queryFn: () => getUserAchievements(userId!),
    enabled: !!userId,
  });
}

/**
 * Комбинированный хук для экрана достижений:
 * возвращает все ачивки города + завершённые пользователя + статистику
 */
export function useAchievementsScreen(
  userId: string | undefined,
  cityId: string = DEFAULT_CITY_ID,
) {
  const cityQuery = useCityAchievements(cityId);
  const completedQuery = useCompletedAchievements(userId);

  const allAchs = cityQuery.data?.items ?? [];
  const completedList = completedQuery.data ?? [];
  const completedIds = new Set(completedList.map((ua) => ua.achievement.id));
  const earnedPoints = calcEarnedScore(completedList);

  const stats = {
    total: allAchs.length,
    unlocked: completedList.length,
    earnedPoints,
    totalPoints: allAchs.reduce((s, a: ApiAchievement) => s + a.rewardScore, 0),
  };

  return {
    achievements: allAchs,
    completedIds,
    stats,
    isLoading: cityQuery.isLoading,
    isError: cityQuery.isError || completedQuery.isError,
    error: cityQuery.error ?? completedQuery.error,
    isRefetching: cityQuery.isRefetching || completedQuery.isRefetching,
    refetch: () => {
      cityQuery.refetch();
      completedQuery.refetch();
    },
  };
}
