/**
 * Сервис для работы с пользователем
 * Подключён к реальному API: /api/Users/*
 */
import { ApiUser, LEVELS, LevelInfo } from '../types';
import { api } from './api';

// ─── API методы ─────────────────────────────────────────────────────────────

/** Получить профиль текущего авторизованного пользователя */
export async function getCurrentUser(): Promise<ApiUser> {
  return api.get<ApiUser>('/api/Users/me');
}

/** Получить пользователя по ID */
export async function getUserById(userId: string): Promise<ApiUser> {
  return api.get<ApiUser>(`/api/Users/${userId}`);
}

/** Получить список всех пользователей */
export async function getAllUsers(): Promise<ApiUser[]> {
  return api.get<ApiUser[]>('/api/Users');
}

// ─── Локальная бизнес-логика (очки/уровни) ──────────────────────────────────

/** Получить информацию об уровне по номеру */
export function getLevelInfo(level: number): LevelInfo {
  return LEVELS[level - 1] || LEVELS[0];
}

/** Рассчитать уровень на основе очков */
export function calculateLevel(totalPoints: number): number {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalPoints >= LEVELS[i].minPoints) {
      return LEVELS[i].level;
    }
  }
  return 1;
}

/** Получить прогресс до следующего уровня (0–100%) */
export function getLevelProgress(totalPoints: number): number {
  const currentLevelInfo = LEVELS.find(
    (l) => totalPoints >= l.minPoints && totalPoints < l.maxPoints,
  );
  if (!currentLevelInfo) return 100;
  const pointsInLevel = totalPoints - currentLevelInfo.minPoints;
  const levelRange = currentLevelInfo.maxPoints - currentLevelInfo.minPoints;
  return Math.min(100, Math.round((pointsInLevel / levelRange) * 100));
}
