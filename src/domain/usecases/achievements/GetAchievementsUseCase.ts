import { injectable, inject } from 'tsyringe';
import { Achievement } from '../../entities/Achievement';
import { IAchievementRepository } from '../../repositories/IAchievementRepository';
import { BaseUseCase } from '../BaseUseCase';

interface GetAchievementsParams {
  type?: Achievement['type'];
  rarity?: Achievement['rarity'];
}

@injectable()
export class GetAchievementsUseCase extends BaseUseCase<
  GetAchievementsParams,
  Achievement[]
> {
  constructor(
    @inject('IAchievementRepository')
    private achievementRepository: IAchievementRepository
  ) {
    super();
  }

  async execute(params: GetAchievementsParams): Promise<Achievement[]> {
    if (params.type) {
      return this.achievementRepository.findByType(params.type);
    }

    if (params.rarity) {
      return this.achievementRepository.findByRarity(params.rarity);
    }

    return this.achievementRepository.findAll();
  }
}
