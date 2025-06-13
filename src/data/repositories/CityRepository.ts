import { injectable } from 'tsyringe';
import { City } from '../../domain/entities/City';
import { ICityRepository } from '../../domain/repositories/ICityRepository';
import { AppConfig } from '../../core/config/app.config';
import { NetworkError } from '../../core/errors/AppError';

@injectable()
export class CityRepository implements ICityRepository {
  private readonly apiUrl = `${AppConfig.API_URL}/graphql`;

  async findById(id: string): Promise<City | null> {
    try {
      const query = `
        query GetCity($cityId: UUID!) {
          cityInfo(cityId: $cityId) {
            id
            name
            description
            lat
            lon
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
          variables: { cityId: id },
        }),
      });

      if (!response.ok) throw new NetworkError('Failed to fetch city');

      const data = await response.json();
      return data.data.cityInfo;
    } catch (error) {
      console.error('Error fetching city:', error);
      return null;
    }
  }

  async findAll(): Promise<City[]> {
    try {
      const query = `
        query GetCities {
          citiesList {
            id
            name
            description
            lat
            lon
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
        }),
      });

      if (!response.ok) throw new NetworkError('Failed to fetch cities');

      const data = await response.json();
      return data.data.citiesList;
    } catch (error) {
      console.error('Error fetching cities:', error);
      return [];
    }
  }

  async create(data: Omit<City, 'id'>): Promise<City> {
    throw new Error('Method not implemented');
  }

  async update(id: string, data: Partial<City>): Promise<City> {
    throw new Error('Method not implemented');
  }

  async delete(id: string): Promise<void> {
    throw new Error('Method not implemented');
  }
}
