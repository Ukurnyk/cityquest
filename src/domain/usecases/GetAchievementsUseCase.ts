import { Achievement } from '../entities/Achievement';
import { AchievementRepository } from '../repositories/AchievementRepository';

export class GetAchievementsUseCase {
  constructor(private achievementRepository: AchievementRepository) {}

  async execute(): Promise<Achievement[]> {
    return this.achievementRepository.getAchievements();
  }
}
