/**
 * Сервис для социальных функций
 * Подключён к реальному API: /api/Users
 */
import { ApiUser, Friend, LeaderboardEntry } from '../types';
import { api } from './api';

/** Получить лидерборд из всех пользователей системы */
export async function getLeaderboard(
  limit: number = 20,
): Promise<LeaderboardEntry[]> {
  const users = await api.get<ApiUser[]>('/api/Users');

  // Сортируем (пока очков нет, просто по дате создания для порядка)
  // и маппим в LeaderboardEntry
  return users.slice(0, limit).map((user, index) => ({
    rank: index + 1,
    userId: user.id,
    name: user.username,
    avatar: user.avatarUrl || undefined,
    level: 1,
    totalPoints: 0,
    visitedPlacesCount: 0,
  }));
}

/** Получить позицию пользователя в рейтинге */
export async function getUserRank(userPoints: number): Promise<number> {
  // Так как реального рейтинга по очкам в API нет, возвращаем 0
  return 0;
}

/** Функции друзей (пока остаются локальными/пустыми, так как в API нет эндпоинтов для Friends) */
let friends: Friend[] = [];

export async function getFriends(): Promise<Friend[]> {
  return [...friends];
}

export async function addFriend(userId: string): Promise<Friend | null> {
  return null;
}

export async function removeFriend(userId: string): Promise<boolean> {
  return false;
}

export async function getFriendsLeaderboard(): Promise<Friend[]> {
  return [];
}

export async function getFriendsStats(): Promise<{
  count: number;
  avgLevel: number;
  avgPoints: number;
}> {
  return { count: 0, avgLevel: 0, avgPoints: 0 };
}

export function resetSocialData(): void {
  friends = [];
}
