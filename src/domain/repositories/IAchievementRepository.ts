import { Achievement } from '../entities/Achievement';
import { IBaseRepository } from './IBaseRepository';

export interface IAchievementRepository extends IBaseRepository<Achievement> {
  findByType(type: Achievement['type']): Promise<Achievement[]>;
  findByRarity(rarity: Achievement['rarity']): Promise<Achievement[]>;
  updateProgress(id: string, progress: number): Promise<Achievement>;
  unlock(id: string): Promise<Achievement>;
}
