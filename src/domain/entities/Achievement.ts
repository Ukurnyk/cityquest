export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: 'QUEST' | 'EXPLORER' | 'SOCIAL' | 'SPECIAL';
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY';
  progress: {
    current: number;
    total: number;
  };
  rewards: {
    experience: number;
    items?: string[];
  };
  unlockedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
