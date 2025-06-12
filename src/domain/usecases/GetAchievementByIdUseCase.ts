import { Achievement } from '../entities/Achievement';
import { AchievementRepository } from '../repositories/AchievementRepository';

export class GetAchievementByIdUseCase {
  constructor(private achievementRepository: AchievementRepository) {}

  async execute(id: string): Promise<Achievement | null> {
    return this.achievementRepository.getAchievementById(id);
  }
}
