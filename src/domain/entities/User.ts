import { Achievement } from './Achievement';
import { Quest } from './Quest';

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  avatarUrl?: string | null;
  isBlocked: boolean;
  blockReason?: string | null;
  isAdmin: boolean;
  level: number;
  experience: number;
  achievements: Achievement[];
  quests: Quest[];
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
  updatedAt: Date;
}
