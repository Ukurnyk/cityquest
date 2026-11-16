/**
 * Сервис для работы с квестами
 * В текущей версии API квесты отсутствуют, сервис возвращает пустые данные.
 */
import { Quest } from '../types';

/** Получить все квесты */
export async function getAllQuests(): Promise<Quest[]> {
  return [];
}

/** Получить квест по ID */
export async function getQuestById(id: string): Promise<Quest | undefined> {
  return undefined;
}

/** Получить прогресс квеста */
export function getQuestProgress(
  questId: string,
  visitedPlaces: string[],
): { completed: number; total: number; percent: number } {
  return { completed: 0, total: 0, percent: 0 };
}

/** Проверить и завершить квест */
export async function checkQuestCompletion(
  questId: string,
  visitedPlaces: string[],
): Promise<{ isCompleted: boolean; reward: number } | null> {
  return null;
}

/** Получить квесты по сложности */
export async function getQuestsByDifficulty(
  difficulty: Quest['difficulty'],
): Promise<Quest[]> {
  return [];
}

/** Загрузить прогресс */
export async function loadQuestProgress(): Promise<void> {}

/** Сбросить прогресс */
export function resetQuestProgress(): void {}

/** Получить статистику квестов */
export async function getQuestsStats(visitedPlaces: string[]): Promise<{
  total: number;
  completed: number;
  inProgress: number;
  totalReward: number;
  earnedReward: number;
}> {
  return {
    total: 0,
    completed: 0,
    inProgress: 0,
    totalReward: 0,
    earnedReward: 0,
  };
}
