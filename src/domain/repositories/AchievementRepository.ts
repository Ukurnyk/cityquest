import { Achievement } from '../entities/Achievement';

export interface AchievementRepository {
  getAchievements(): Promise<Achievement[]>;
  getAchievementById(id: string): Promise<Achievement | null>;
  updateAchievementProgress(id: string, progress: number): Promise<void>;
}
