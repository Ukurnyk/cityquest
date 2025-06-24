import { injectable } from 'tsyringe';
import { Achievement } from '../../domain/entities/Achievement';
import { IAchievementRepository } from '../../domain/repositories/IAchievementRepository';
import { NetworkError } from '@/shared/errors/AppError';

@injectable()
export class AchievementRepository implements IAchievementRepository {
  private readonly apiUrl = `${
    process.env.API_URL || 'https://api.questly.com'
  }/graphql`;

  async findById(id: string): Promise<Achievement | null> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      if (!response.ok) throw new NetworkError('Failed to fetch achievement');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching achievement:', error);
      return null;
    }
  }

  async getUserAchievements(userId: string): Promise<Achievement[]> {
    try {
      const query = `
        query GetUserAchievements($userId: UUID!) {
          userAchievements(userId: $userId) {
            achievement {
              id
              title
              description
              goal
              rewardScore
              cityId
              iconUrl
              lat
              lon
              categoryId
              isPartner
              createdAt
            }
            progress
            isCompleted
            earnedAt
          }
        }
      `;

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { userId },
        }),
      });

      if (!response.ok)
        throw new NetworkError('Failed to fetch user achievements');

      const data = await response.json();
      return data.data.userAchievements.map((ua: any) => ua.achievement);
    } catch (error) {
      console.error('Error fetching user achievements:', error);
      return [];
    }
  }

  async findAll(): Promise<Achievement[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new NetworkError('Failed to fetch achievements');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching achievements:', error);
      return [];
    }
  }

  async create(data: Partial<Achievement>): Promise<Achievement> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new NetworkError('Failed to create achievement');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating achievement:', error);
      throw error;
    }
  }

  async update(id: string, data: Partial<Achievement>): Promise<Achievement> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new NetworkError('Failed to update achievement');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating achievement:', error);
      throw error;
    }
  }

  async updateProgress(id: string, progress: number): Promise<Achievement> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}/progress`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress }),
      });
      if (!response.ok)
        throw new NetworkError('Failed to update achievement progress');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating achievement progress:', error);
      throw error;
    }
  }

  async unlock(id: string): Promise<Achievement> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}/unlock`, {
        method: 'POST',
      });
      if (!response.ok) throw new NetworkError('Failed to unlock achievement');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error unlocking achievement:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new NetworkError('Failed to delete achievement');
    } catch (error) {
      console.error('Error deleting achievement:', error);
      throw error;
    }
  }
}
