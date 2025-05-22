import { Quest } from '../../domain/entities/Quest';

export class QuestModel implements Quest {
  id: string;
  title: string;
  description: string;
  points: number;
  location: {
    latitude: number;
    longitude: number;
  };
  type: 'WALK' | 'PHOTO' | 'CHECK_IN';
  status: 'ACTIVE' | 'COMPLETED' | 'LOCKED';
  requirements?: {
    level?: number;
    achievements?: string[];
  };
  rewards: {
    experience: number;
    items?: string[];
  };
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<Quest>) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.description = data.description || '';
    this.points = data.points || 0;
    this.location = data.location || { latitude: 0, longitude: 0 };
    this.type = data.type || 'WALK';
    this.status = data.status || 'LOCKED';
    this.requirements = data.requirements;
    this.rewards = data.rewards || { experience: 0 };
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  toJSON(): Quest {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      points: this.points,
      location: this.location,
      type: this.type,
      status: this.status,
      requirements: this.requirements,
      rewards: this.rewards,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
