export interface Quest {
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
}
