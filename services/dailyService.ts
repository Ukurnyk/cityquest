/**
 * Сервис для работы с ежедневными заданиями и стриками
 * В текущей версии API задания отсутствуют, сервис возвращает базовые данные.
 */
import { DailyTask, Streak } from '../types';

// Локальное состояние (пока без сохранения)
let todaysTasks: DailyTask[] = [];
let userStreak: Streak = {
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: '',
  multiplier: 1,
};

/** Инициализировать ежедневные задания */
export async function initDailyTasks(): Promise<void> {}

/** Получить сегодняшние задания */
export async function getDailyTasks(): Promise<DailyTask[]> {
  return todaysTasks;
}

/** Обновить прогресс задания */
export async function updateTaskProgress(
  taskType: DailyTask['type'],
  increment: number = 1,
): Promise<DailyTask | null> {
  return null;
}

/** Получить информацию о стрике */
export async function getStreakInfo(): Promise<Streak> {
  return { ...userStreak };
}

/** Получить бонус за стрик */
export function getStreakBonus(basePoints: number): number {
  return basePoints;
}

/** Получить статистику заданий */
export async function getDailyStats(): Promise<{
  total: number;
  completed: number;
  totalPoints: number;
  earnedPoints: number;
}> {
  return {
    total: 0,
    completed: 0,
    totalPoints: 0,
    earnedPoints: 0,
  };
}

/** Сбросить для тестирования */
export function resetDailyProgress(): void {
  todaysTasks = [];
}
