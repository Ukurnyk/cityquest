import { Quest } from '../entities/Quest';
import { IBaseRepository } from './IBaseRepository';

export interface IQuestRepository extends IBaseRepository<Quest> {
  findByLocation(
    latitude: number,
    longitude: number,
    radius: number
  ): Promise<Quest[]>;
  findByStatus(status: Quest['status']): Promise<Quest[]>;
  updateProgress(id: string, progress: number): Promise<Quest>;
}
