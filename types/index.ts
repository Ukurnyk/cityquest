/**
 * Типы данных для приложения Questly
 */

// Категории мест
export type PlaceCategory = 'museum' | 'cafe' | 'park' | 'landmark' | 'event';

// Место/локация
export interface Place {
  id: string;
  name: string;
  description: string;
  category: PlaceCategory;
  latitude: number;
  longitude: number;
  address: string;
  image: string;
  points: number;
  isVisited?: boolean;
}

// Достижение (ачивка)
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  placeId?: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

// Профиль пользователя
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  level: number;
  points: number;
  totalPoints: number;
  achievements: string[]; // ID ачивок
  visitedPlaces: string[]; // ID мест
  createdAt: string;
}

// Координаты
export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Ответ геолокации
export interface LocationData extends Coordinates {
  accuracy: number;
  timestamp: number;
}

// Настройки карты
export interface MapRegion extends Coordinates {
  latitudeDelta: number;
  longitudeDelta: number;
}

// Уровень пользователя
export interface LevelInfo {
  level: number;
  title: string;
  minPoints: number;
  maxPoints: number;
}

// Список уровней
export const LEVELS: LevelInfo[] = [
  { level: 1, title: 'Новичок', minPoints: 0, maxPoints: 100 },
  { level: 2, title: 'Исследователь', minPoints: 100, maxPoints: 300 },
  { level: 3, title: 'Путешественник', minPoints: 300, maxPoints: 600 },
  { level: 4, title: 'Знаток города', minPoints: 600, maxPoints: 1000 },
  { level: 5, title: 'Гуру', minPoints: 1000, maxPoints: 1500 },
  { level: 6, title: 'Легенда', minPoints: 1500, maxPoints: 2500 },
  { level: 7, title: 'Мастер', minPoints: 2500, maxPoints: 4000 },
  {
    level: 8,
    title: 'Великий исследователь',
    minPoints: 4000,
    maxPoints: 6000,
  },
  { level: 9, title: 'Хранитель города', minPoints: 6000, maxPoints: 10000 },
  {
    level: 10,
    title: 'Легенда Questly',
    minPoints: 10000,
    maxPoints: Infinity,
  },
];

// Квест / маршрут
export interface Quest {
  id: string;
  title: string;
  description: string;
  places: string[]; // ID мест в маршруте
  reward: number;
  icon: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isCompleted?: boolean;
}

// Ежедневное задание
export interface DailyTask {
  id: string;
  title: string;
  description?: string;
  points: number;
  type: 'visit' | 'photo' | 'quest_progress' | 'checkin' | 'share';
  target: number;
  progress: number;
  isCompleted: boolean;
  expiresAt: string;
}

// Стрик (серия посещений)
export interface Streak {
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string;
  multiplier: number;
}

// Друг
export interface Friend {
  id: string;
  name: string;
  avatar?: string;
  level: number;
  totalPoints: number;
  addedAt: string;
}

// Запись в лидерборде
export interface LeaderboardEntry {
  rank: number;
  userId: string;
  name: string;
  avatar?: string;
  level: number;
  totalPoints: number;
  visitedPlacesCount: number;
}

// Фотоотчёт
export interface PhotoReport {
  id: string;
  placeId: string;
  userId: string;
  imageUri: string;
  caption?: string;
  createdAt: string;
  likes: number;
}

// Коллекция мест
export interface Collection {
  id: string;
  title: string;
  description?: string;
  placeIds: string[];
  badge: string;
  reward: number;
  isCompleted?: boolean;
}

// Сезонный ивент
export interface SeasonalEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  specialPlaces: string[];
  bonusMultiplier: number;
  specialAchievements: string[];
  isActive?: boolean;
}

// QR-код для чекина
export interface QRCheckin {
  placeId: string;
  validUntil: string;
  code: string;
}

// ─── Типы REST API ─────────────────────────────────────────────────────────

export interface TokenPair {
  accessToken: string;
  refreshToken: string | null;
}

/** Пользователь из API (GET /api/Users/me и /api/Users/{id}) */
export interface ApiUser {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  avatarUrl: string | null;
  isBlocked: boolean;
  blockReason: string | null;
  isAdmin: boolean;
}

/** Категория достижения */
export interface AchievementCategory {
  id: string;
  name: string;
  description: string | null;
}

/** Достижение из API */
export interface ApiAchievement {
  id: string;
  title: string;
  description: string;
  goal: number;
  rewardScore: number;
  cityId: string | null;
  city: City | null;
  iconUrl: string | null;
  lat: number | null;
  lon: number | null;
  categoryId: string | null;
  category: AchievementCategory | null;
  isPartner: boolean;
  createdAt: string;
}

/** Прогресс пользователя по достижению */
export interface UserAchievement {
  id: string;
  userId: string;
  achievementId: string;
  achievement: ApiAchievement;
  progress: number;
  isCompleted: boolean;
  earnedAt: string;
}

/** Город из API */
export interface City {
  id: string;
  name: string;
  description: string | null;
  lat: number | null;
  lon: number | null;
}

/** Пагинированный список достижений */
export interface AchievementPaginatedResult {
  items: ApiAchievement[];
  totalItems: number;
  page: number;
  pageSize: number;
}
