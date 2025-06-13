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
