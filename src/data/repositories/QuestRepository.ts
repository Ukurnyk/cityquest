import { injectable } from 'tsyringe';
import { Quest } from '../../domain/entities/Quest';
import { IQuestRepository } from '../../domain/repositories/IQuestRepository';
import { QuestModel } from '../models/QuestModel';
import { NetworkError } from '@/shared/errors/AppError';

@injectable()
export class QuestRepository implements IQuestRepository {
  private readonly apiUrl = `${
    process.env.API_URL || 'https://api.questly.com'
  }/quests`;

  async findById(id: string): Promise<Quest | null> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      if (!response.ok) throw new NetworkError('Failed to fetch quest');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching quest:', error);
      return null;
    }
  }

  async findAll(): Promise<Quest[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new NetworkError('Failed to fetch quests');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching quests:', error);
      return [];
    }
  }

  async findByLocation(
    latitude: number,
    longitude: number,
    radius: number
  ): Promise<Quest[]> {
    try {
      const response = await fetch(
        `${this.apiUrl}/nearby?lat=${latitude}&lng=${longitude}&radius=${radius}`
      );
      if (!response.ok) throw new NetworkError('Failed to fetch nearby quests');
      const data = await response.json();
      return data.map((item: any) => new QuestModel(item));
    } catch (error) {
      console.error('Error fetching nearby quests:', error);
      return [];
    }
  }

  async findByStatus(status: Quest['status']): Promise<Quest[]> {
    try {
      const response = await fetch(`${this.apiUrl}?status=${status}`);
      if (!response.ok)
        throw new NetworkError('Failed to fetch quests by status');
      const data = await response.json();
      return data.map((item: any) => new QuestModel(item));
    } catch (error) {
      console.error('Error fetching quests by status:', error);
      return [];
    }
  }

  async create(data: Partial<Quest>): Promise<Quest> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new NetworkError('Failed to create quest');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating quest:', error);
      throw error;
    }
  }

  async update(id: string, data: Partial<Quest>): Promise<Quest> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new NetworkError('Failed to update quest');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating quest:', error);
      throw error;
    }
  }

  async updateProgress(id: string, progress: number): Promise<Quest> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}/progress`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress }),
      });
      if (!response.ok)
        throw new NetworkError('Failed to update quest progress');
      const result = await response.json();
      return new QuestModel(result);
    } catch (error) {
      console.error('Error updating quest progress:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new NetworkError('Failed to delete quest');
    } catch (error) {
      console.error('Error deleting quest:', error);
      throw error;
    }
  }
}
