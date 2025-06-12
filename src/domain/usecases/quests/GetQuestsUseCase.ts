import { injectable, inject } from 'tsyringe';
import { Quest } from '../../entities/Quest';
import { IQuestRepository } from '../../repositories/IQuestRepository';
import { BaseUseCase } from '../BaseUseCase';

interface GetQuestsParams {
  status?: Quest['status'];
  location?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
}

@injectable()
export class GetQuestsUseCase extends BaseUseCase<GetQuestsParams, Quest[]> {
  constructor(
    @inject('IQuestRepository')
    private questRepository: IQuestRepository
  ) {
    super();
  }

  async execute(params: GetQuestsParams): Promise<Quest[]> {
    if (params.location) {
      return this.questRepository.findByLocation(
        params.location.latitude,
        params.location.longitude,
        params.location.radius
      );
    }

    if (params.status) {
      return this.questRepository.findByStatus(params.status);
    }

    return this.questRepository.findAll();
  }
}
