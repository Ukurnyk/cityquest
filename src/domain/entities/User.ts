import { Achievement } from './Achievement';
import { Quest } from './Quest';

export interface User {
  id: string;
  username: string;
  email: string;
  level: number;
  experience: number;
  achievements: Achievement[];
  quests: Quest[];
  avatar: string;
  stats: {
    questsCompleted: number;
    achievementsUnlocked: number;
    totalPoints: number;
    distanceWalked: number;
  };
  settings: {
    notifications: boolean;
    darkMode: boolean;
    language: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
