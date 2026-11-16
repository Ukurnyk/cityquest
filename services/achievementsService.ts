/**
 * Сервис для работы с достижениями
 * Подключён к реальному API: /api/achievements/*
 */
import {
  AchievementPaginatedResult,
  ApiAchievement,
  UserAchievement,
} from '../types';
import { api } from './api';

// ─── API методы ─────────────────────────────────────────────────────────────

/** Получить достижения города с пагинацией */
export async function getCityAchievements(
  cityId: string,
  page = 1,
  pageSize = 50,
): Promise<AchievementPaginatedResult> {
  return api.get<AchievementPaginatedResult>(
    `/api/achievements/cities/${cityId}?page=${page}&pageSize=${pageSize}`,
  );
}

/** Получить все достижения пользователя (с прогрессом) */
export async function getUserAchievements(
  userId: string,
): Promise<UserAchievement[]> {
  return api.get<UserAchievement[]>(`/api/achievements/users/${userId}`);
}

/** Получить завершённые достижения пользователя */
export async function getCompletedAchievements(
  userId: string,
): Promise<UserAchievement[]> {
  return api.get<UserAchievement[]>(
    `/api/achievements/users/${userId}/completed`,
  );
}

/** Получить достижение по ID */
export async function getAchievementById(
  achId: string,
): Promise<ApiAchievement> {
  return api.get<ApiAchievement>(`/api/achievements/${achId}`);
}

// ─── Вспомогательные утилиты ────────────────────────────────────────────────

/** Посчитать очки за завершённые достижения */
export function calcEarnedScore(completed: UserAchievement[]): number {
  return completed.reduce((sum, ua) => sum + ua.achievement.rewardScore, 0);
}
