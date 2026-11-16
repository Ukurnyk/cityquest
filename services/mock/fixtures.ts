/**
 * Демо-данные для mock-режима API (EXPO_PUBLIC_API_MOCK=1).
 * Формат совпадает с ответами реального бэкенда, координаты — центр Чебоксар.
 */
import {
  AchievementCategory,
  ApiAchievement,
  ApiUser,
  City,
  UserAchievement,
} from '@/types';

export const MOCK_CITY: City = {
  id: '00000000-0000-0000-0000-000000000001',
  name: 'Чебоксары',
  description: 'Столица Чувашской Республики',
  lat: 56.1391,
  lon: 47.2487,
};

const categories: Record<string, AchievementCategory> = {
  museum: { id: 'c-museum', name: 'Музеи', description: null },
  park: { id: 'c-park', name: 'Парки', description: null },
  landmark: {
    id: 'c-landmark',
    name: 'Достопримечательности',
    description: null,
  },
  cafe: { id: 'c-cafe', name: 'Кафе и рестораны', description: null },
  event: { id: 'c-event', name: 'События', description: null },
};

function achievement(
  id: string,
  title: string,
  description: string,
  category: keyof typeof categories,
  lat: number,
  lon: number,
  rewardScore: number,
  isPartner = false,
): ApiAchievement {
  return {
    id,
    title,
    description,
    goal: 1,
    rewardScore,
    cityId: MOCK_CITY.id,
    city: MOCK_CITY,
    iconUrl: null,
    lat,
    lon,
    categoryId: categories[category].id,
    category: categories[category],
    isPartner,
    createdAt: '2026-09-01T10:00:00Z',
  };
}

export const MOCK_ACHIEVEMENTS: ApiAchievement[] = [
  achievement(
    'a-mother',
    'Монумент Матери-Покровительнице',
    'Символ города на берегу Чебоксарского залива. Отсюда открывается вид на всю набережную.',
    'landmark',
    56.1446,
    47.2519,
    50,
  ),
  achievement(
    'a-cathedral',
    'Введенский собор',
    'Старейшее каменное здание города, конец XVII века.',
    'landmark',
    56.1471,
    47.2497,
    40,
  ),
  achievement(
    'a-monastery',
    'Свято-Троицкий монастырь',
    'Один из старейших монастырей Поволжья.',
    'landmark',
    56.1489,
    47.25,
    40,
  ),
  achievement(
    'a-museum',
    'Чувашский национальный музей',
    'История, этнография и культура Чувашии.',
    'museum',
    56.1442,
    47.2466,
    60,
  ),
  achievement(
    'a-beer-museum',
    'Музей пива',
    'Небольшой музей об истории пивоварения в Чувашии.',
    'museum',
    56.1458,
    47.2478,
    30,
  ),
  achievement(
    'a-embankment',
    'Набережная Чебоксарского залива',
    'Прогулочная зона вокруг залива — пройдите её целиком.',
    'park',
    56.141,
    47.244,
    30,
  ),
  achievement(
    'a-lakreevsky',
    'Лакреевский лес',
    'Городской парк с прудами и экотропами.',
    'park',
    56.1194,
    47.2414,
    40,
  ),
  achievement(
    'a-cafe',
    'Кафе на Красной площади',
    'Партнёр Questly: покажите ачивку и получите кофе со скидкой.',
    'cafe',
    56.1432,
    47.2489,
    20,
    true,
  ),
  achievement(
    'a-festival',
    'Фестиваль на набережной',
    'Сезонное событие: отметьтесь на площадке фестиваля.',
    'event',
    56.1419,
    47.2463,
    70,
  ),
];

export const MOCK_USERS: ApiUser[] = [
  'explorer',
  'chuvash_walker',
  'volga_runner',
  'anna_k',
  'dmitry',
  'questmaster',
  'tanya_p',
  'citylover',
].map((username, index) => ({
  id: `u-${index + 1}`,
  username,
  email: `${username}@example.com`,
  createdAt: '2026-09-01T10:00:00Z',
  avatarUrl: null,
  isBlocked: false,
  blockReason: null,
  isAdmin: false,
}));

/** Ачивки, которые у демо-пользователя уже получены */
export function mockCompletedAchievements(userId: string): UserAchievement[] {
  return ['a-mother', 'a-embankment'].map((achievementId) => ({
    id: `ua-${achievementId}`,
    userId,
    achievementId,
    achievement: MOCK_ACHIEVEMENTS.find((a) => a.id === achievementId)!,
    progress: 1,
    isCompleted: true,
    earnedAt: '2026-10-15T12:00:00Z',
  }));
}
