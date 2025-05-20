export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  xp: number;
  level: number;
  achievements: Achievement[];
  badges: Badge[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  type: 'location' | 'event' | 'route';
  location?: {
    latitude: number;
    longitude: number;
    radius: number;
  };
  qrCode?: string;
  isCompleted: boolean;
  completedAt?: Date;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  xp: number;
  rank: number;
  achievementsCount: number;
}

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  AchievementDetails: { achievementId: string };
  Profile: undefined;
  Leaderboard: undefined;
};
