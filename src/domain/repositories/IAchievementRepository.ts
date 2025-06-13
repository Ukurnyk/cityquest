import { Achievement } from '../entities/Achievement';
import { IBaseRepository } from './IBaseRepository';

export interface IAchievementRepository extends IBaseRepository<Achievement> {
  getUserAchievements(userId: string): Promise<Achievement[]>;
}
