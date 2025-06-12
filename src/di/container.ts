import { container } from 'tsyringe';
import { QuestRepository } from '@/data/repositories/QuestRepository';
import { AchievementRepository } from '@/data/repositories/AchievementRepository';
import { LocationRepository } from '@/data/repositories/LocationRepository';
import { UserRepository } from '@/data/repositories/UserRepository';

// Регистрация сервисов
container.register('IQuestRepository', {
  useClass: QuestRepository,
});

container.register('IAchievementRepository', {
  useClass: AchievementRepository,
});

container.register('ILocationRepository', {
  useClass: LocationRepository,
});

container.register('IUserRepository', {
  useClass: UserRepository,
});

export { container };
