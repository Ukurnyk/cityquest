import { User } from '../entities/User';
import { IBaseRepository } from './IBaseRepository';

export interface IUserRepository extends IBaseRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  updateSettings(id: string, settings: User['settings']): Promise<User>;
  updateStats(id: string, stats: Partial<User['stats']>): Promise<User>;
  addExperience(id: string, amount: number): Promise<User>;
}
