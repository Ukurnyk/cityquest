export interface Achievement {
  id: string;
  title: string;
  description: string;
  goal: number;
  rewardScore: number;
  cityId?: string;
  iconUrl: string;
  lat?: number;
  lon?: number;
  categoryId?: string;
  isPartner: boolean;
  createdAt: Date;
}
