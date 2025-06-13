export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  avatarUrl?: string | null;
  isBlocked: boolean;
  blockReason?: string | null;
  isAdmin: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  goal: number;
  rewardScore: number;
  cityId?: string | null;
  city: City;
  iconUrl: string;
  lat?: number | null;
  lon?: number | null;
  categoryId?: string | null;
  category: AchievementCategory;
  isPartner: boolean;
  createdAt: string;
}

export interface AchievementCategory {
  id: string;
  name: string;
  description?: string | null;
}

export interface City {
  id: string;
  name: string;
  description?: string | null;
  lat?: number | null;
  lon?: number | null;
}

export interface UserAchievement {
  id: string;
  userId: string;
  user: User;
  achievementId: string;
  achievement: Achievement;
  progress: number;
  isCompleted: boolean;
  earnedAt: string;
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
