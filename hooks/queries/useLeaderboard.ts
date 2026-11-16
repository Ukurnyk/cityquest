/**
 * Query-хук для лидерборда
 */
import { getLeaderboard } from '@/services/socialService';
import { LeaderboardEntry } from '@/types';
import { useQuery } from '@tanstack/react-query';

export const leaderboardKeys = {
  top: (limit: number) => ['leaderboard', limit] as const,
};

/** Лидерборд — кэш 2 минуты (данные меняются чаще) */
export function useLeaderboard(limit: number = 20) {
  return useQuery<LeaderboardEntry[]>({
    queryKey: leaderboardKeys.top(limit),
    queryFn: () => getLeaderboard(limit),
    staleTime: 2 * 60 * 1000,
  });
}
