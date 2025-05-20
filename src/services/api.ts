import { Achievement, User } from '@/types';

// Моковые данные
let mockUser: User = {
  id: '1',
  username: 'Аноним',
  email: '',
  xp: 0,
  level: 1,
  achievements: [],
  badges: [],
};

let mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Кофейня на Невском',
    description: 'Выпей кофе в легендарной кофейне',
    xpReward: 50,
    type: 'location',
    location: { latitude: 59.9343, longitude: 30.3351, radius: 100 },
    isCompleted: false,
  },
  {
    id: '2',
    title: 'Памятник Пушкину',
    description: 'Найди памятник великому поэту',
    xpReward: 30,
    type: 'location',
    location: { latitude: 59.9345, longitude: 30.3353, radius: 50 },
    isCompleted: false,
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
    mockAchievements = mockAchievements.map((a) =>
      a.id === id ? { ...a, isCompleted: true, completedAt: new Date() } : a
    );
    return mockAchievements.find((a) => a.id === id)!;
  },
};
