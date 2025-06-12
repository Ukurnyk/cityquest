import { AchievementRepository } from '../repositories/AchievementRepository';

export class CompleteAchievementUseCase {
  constructor(private achievementRepository: AchievementRepository) {}

  async execute(id: string): Promise<void> {
    await this.achievementRepository.updateAchievementProgress(id, 1);
  }
}
