import { injectable } from 'tsyringe';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import {
  useGetUserQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  useGetUserByIdQuery,
} from '@/services/apollo/gql/operations';
import { UserForCreateInput } from '@/services/apollo/types';

@injectable()
export class UserRepository implements IUserRepository {
  // Методы для использования в React компонентах (хуки)
  useGetCurrentUser() {
    return useGetUserQuery();
  }

  useCreateUser() {
    return useCreateUserMutation();
  }

  useLoginUser() {
    return useLoginUserMutation();
  }

  useGetUserById(userId: string) {
    return useGetUserByIdQuery({ variables: { userId } });
  }

  // Синхронные методы для совместимости с интерфейсом
  async getCurrentUser(): Promise<User | null> {
    // Этот метод должен использоваться только в хуках React
    throw new Error('Use useGetCurrentUser() hook instead');
  }

  async createUser(userData: UserForCreateInput): Promise<string> {
    // Этот метод должен использоваться только в хуках React
    throw new Error('Use useCreateUser() hook instead');
  }

  async findById(id: string): Promise<User | null> {
    // Этот метод должен использоваться только в хуках React
    throw new Error('Use useGetUserById() hook instead');
  }

  async findAll(): Promise<User[]> {
    // Для получения всех пользователей нужно добавить соответствующую GraphQL операцию
    throw new Error('Get all users operation not implemented');
  }

  async findByEmail(email: string): Promise<User | null> {
    // Для получения пользователя по email нужно добавить соответствующую GraphQL операцию
    throw new Error('Get user by email operation not implemented');
  }

  async create(data: Partial<User>): Promise<User> {
    // Этот метод должен использоваться только в хуках React
    throw new Error('Use useCreateUser() hook instead');
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    // Для обновления пользователя нужно добавить соответствующую GraphQL операцию
    throw new Error('Update user operation not implemented');
  }

  async updateSettings(id: string, settings: User['settings']): Promise<User> {
    // Для обновления настроек нужно добавить соответствующую GraphQL операцию
    throw new Error('Update user settings operation not implemented');
  }

  async updateStats(id: string, stats: Partial<User['stats']>): Promise<User> {
    // Для обновления статистики нужно добавить соответствующую GraphQL операцию
    throw new Error('Update user stats operation not implemented');
  }

  async addExperience(id: string, amount: number): Promise<User> {
    // Для добавления опыта нужно добавить соответствующую GraphQL операцию
    throw new Error('Add experience operation not implemented');
  }

  async delete(id: string): Promise<void> {
    // Для удаления пользователя нужно добавить соответствующую GraphQL операцию
    throw new Error('Delete user operation not implemented');
  }
}
