/**
 * Query-хуки для работы с квестами
 */
import { getAllQuests, getQuestsStats } from '@/services/questsService';
import { Quest } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const questKeys = {
  all: ['quests'] as const,
  stats: (visitedPlaces: string[]) =>
    ['quests', 'stats', visitedPlaces] as const,
};

/** Все квесты */
export function useQuests() {
  return useQuery<Quest[]>({
    queryKey: questKeys.all,
    queryFn: getAllQuests,
  });
}

/** Статистика квестов по посещённым местам */
export function useQuestsStats(visitedPlaces: string[]) {
  return useQuery({
    queryKey: questKeys.stats(visitedPlaces),
    queryFn: () => getQuestsStats(visitedPlaces),
  });
}
