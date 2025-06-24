import { Achievement } from '@/types';
import { User } from '@/domain/entities/User';

// Моковые данные
let mockUser: User = {
  id: '1',
  username: 'Аноним',
  email: '',
  createdAt: '2024-01-01',
  isBlocked: false,
  isAdmin: false,
  level: 1,
  experience: 0,
  achievements: [],
  quests: [],
  stats: {
    questsCompleted: 0,
    achievementsUnlocked: 0,
    totalPoints: 0,
    distanceWalked: 0,
  },
  settings: {
    notifications: true,
    darkMode: false,
    language: 'ru',
  },
  updatedAt: new Date(),
};

let mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Кофейня на Невском',
    description: 'Выпей кофе в легендарной кофейне',
    goal: 1,
    rewardScore: 50,
    iconUrl: 'https://example.com/coffee.png',
    isPartner: false,
    createdAt: '2024-01-01',
    city: {
      id: '1',
      name: 'Санкт-Петербург',
      description: 'Северная столица',
    },
    category: {
      id: '1',
      name: 'Еда',
      description: 'Достижения за посещение кафе и ресторанов',
    },
  },
  {
    id: '2',
    title: 'Памятник Пушкину',
    description: 'Найди памятник великому поэту',
    goal: 1,
    rewardScore: 30,
    iconUrl: 'https://example.com/pushkin.png',
    isPartner: false,
    createdAt: '2024-01-01',
    city: {
      id: '1',
      name: 'Санкт-Петербург',
      description: 'Северная столица',
    },
    category: {
      id: '2',
      name: 'Культура',
      description: 'Достижения за посещение культурных мест',
    },
  },
];

export const api = {
  loginAnon: async (): Promise<User> => {
    mockUser = { ...mockUser, id: 'anon', username: 'Аноним', email: '' };
    return mockUser;
  },
  loginGoogle: async (): Promise<User> => {
    mockUser = {
      ...mockUser,
      id: 'google',
      username: 'Google User',
      email: 'user@gmail.com',
    };
    return mockUser;
  },
  getAchievements: async (): Promise<Achievement[]> => {
    return mockAchievements;
  },
  completeAchievement: async (id: string): Promise<Achievement> => {
    const achievement = mockAchievements.find((a) => a.id === id);
    if (achievement) {
      // В реальном приложении здесь была бы логика обновления
      return achievement;
    }
    throw new Error('Achievement not found');
  },
};
