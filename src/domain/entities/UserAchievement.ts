import { Achievement } from './Achievement';
import { User } from './User';

export interface UserAchievement {
  id: string;
  userId: string;
  user: User;
  achievementId: string;
  achievement: Achievement;
  progress: number;
  isCompleted: boolean;
  earnedAt: Date;
}
