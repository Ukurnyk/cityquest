import { injectable } from 'tsyringe';
import { City } from '../../domain/entities/City';
import { NetworkError } from '@/shared/errors/AppError';

@injectable()
export class CityRepository {
  private readonly apiUrl = `${
    process.env.API_URL || 'https://api.questly.com'
  }/graphql`;

  async findById(id: string): Promise<City | null> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      if (!response.ok) throw new NetworkError('Failed to fetch city');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching city:', error);
      return null;
    }
  }

  async findAll(): Promise<City[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new NetworkError('Failed to fetch cities');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      return [];
    }
  }

  async create(data: Partial<City>): Promise<City> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new NetworkError('Failed to create city');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating city:', error);
      throw error;
    }
  }

  async update(id: string, data: Partial<City>): Promise<City> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new NetworkError('Failed to update city');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating city:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new NetworkError('Failed to delete city');
    } catch (error) {
      console.error('Error deleting city:', error);
      throw error;
    }
  }
}
