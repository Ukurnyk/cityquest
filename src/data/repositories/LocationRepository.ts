import { injectable } from 'tsyringe';
import { IBaseRepository } from '@/domain/repositories/IBaseRepository';
import { NetworkError } from '@/shared/errors/AppError';
import { Location } from '@/domain/entities/Location';
import { LocationRepository as ILocationRepository } from '@/domain/repositories/LocationRepository';

@injectable()
export class LocationRepository implements ILocationRepository {
  private readonly apiUrl = `${
    process.env.API_URL || 'https://api.questly.com'
  }/locations`;

  async findById(id: string): Promise<Location | null> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      if (!response.ok) throw new NetworkError('Failed to fetch location');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching location:', error);
      return null;
    }
  }

  async findAll(): Promise<Location[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new NetworkError('Failed to fetch locations');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching locations:', error);
      return [];
    }
  }

  async create(data: Partial<Location>): Promise<Location> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new NetworkError('Failed to create location');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating location:', error);
      throw error;
    }
  }

  async update(id: string, data: Partial<Location>): Promise<Location> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new NetworkError('Failed to update location');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating location:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new NetworkError('Failed to delete location');
    } catch (error) {
      console.error('Error deleting location:', error);
      throw error;
    }
  }

  async getLocations(): Promise<Location[]> {
    // TODO: Реализовать получение локаций
    return [];
  }

  async getLocationById(id: string): Promise<Location | null> {
    // TODO: Реализовать получение локации по ID
    return null;
  }
}
