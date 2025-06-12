import { injectable } from 'tsyringe';
import { User } from '../../domain/entities/User';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { AppConfig } from '../../core/config/app.config';
import { NetworkError } from '../../core/errors/AppError';

@injectable()
export class UserRepository implements IUserRepository {
  private readonly apiUrl = `${AppConfig.API_URL}/users`;

  async findById(id: string): Promise<User | null> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`);
      if (!response.ok) throw new NetworkError('Failed to fetch user');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user:', error);
      return null;
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) throw new NetworkError('Failed to fetch users');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    try {
      const response = await fetch(`${this.apiUrl}/email/${email}`);
      if (!response.ok) throw new NetworkError('Failed to fetch user by email');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user by email:', error);
      return null;
    }
  }

  async create(data: Partial<User>): Promise<User> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new NetworkError('Failed to create user');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new NetworkError('Failed to update user');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async updateSettings(id: string, settings: User['settings']): Promise<User> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}/settings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      });
      if (!response.ok)
        throw new NetworkError('Failed to update user settings');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating user settings:', error);
      throw error;
    }
  }

  async updateStats(id: string, stats: Partial<User['stats']>): Promise<User> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}/stats`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stats }),
      });
      if (!response.ok) throw new NetworkError('Failed to update user stats');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error updating user stats:', error);
      throw error;
    }
  }

  async addExperience(id: string, amount: number): Promise<User> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}/experience`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      if (!response.ok) throw new NetworkError('Failed to add experience');
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error adding experience:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new NetworkError('Failed to delete user');
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
}
