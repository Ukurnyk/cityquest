/**
 * Сервис для работы с местами
 * Адаптирован: использует достижения (Achievements) из API как места на карте
 */
import { Coordinates, Place, PlaceCategory } from '../types';
import { getCityAchievements } from './achievementsService';

// Временный ID города
const DEFAULT_CITY_ID = '00000000-0000-0000-0000-000000000001';

/** Маппинг категорий API в категории приложения */
function mapCategory(apiCategoryName: string | null): PlaceCategory {
  if (!apiCategoryName) return 'landmark';
  const name = apiCategoryName.toLowerCase();
  if (name.includes('музей')) return 'museum';
  if (name.includes('кафе') || name.includes('ресторан')) return 'cafe';
  if (name.includes('парк')) return 'park';
  if (name.includes('памятник') || name.includes('достопримечательность'))
    return 'landmark';
  if (name.includes('событие')) return 'event';
  return 'landmark';
}

/** Получить все места (через ачивки города) */
export async function getAllPlaces(): Promise<Place[]> {
  const result = await getCityAchievements(DEFAULT_CITY_ID, 1, 100);
  return result.items
    .filter((item) => item.lat !== null && item.lon !== null)
    .map((item) => ({
      id: item.id,
      name: item.title,
      description: item.description,
      category: mapCategory(item.category?.name || null),
      latitude: item.lat!,
      longitude: item.lon!,
      address: item.category?.description || 'г. Чебоксары',
      image:
        item.iconUrl ||
        'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80',
      points: item.rewardScore,
      isVisited: false,
    }));
}

/** Получить место по ID */
export async function getPlaceById(id: string): Promise<Place | undefined> {
  const all = await getAllPlaces();
  return all.find((p) => p.id === id);
}

/** Получить места по категории */
export async function getPlacesByCategory(
  category: PlaceCategory,
): Promise<Place[]> {
  const all = await getAllPlaces();
  return all.filter((p) => p.category === category);
}

/** Получить ближайшие места */
export async function getNearbyPlaces(
  coords: Coordinates,
  radiusKm: number = 1,
): Promise<Place[]> {
  const all = await getAllPlaces();
  return all.filter((place) => {
    const distance = calculateDistance(
      coords.latitude,
      coords.longitude,
      place.latitude,
      place.longitude,
    );
    return distance <= radiusKm;
  });
}

/** Проверить, находится ли пользователь рядом с местом */
export function isNearPlace(
  userCoords: Coordinates,
  placeCoords: Coordinates,
  thresholdMeters: number = 50,
): boolean {
  const distance = calculateDistance(
    userCoords.latitude,
    userCoords.longitude,
    placeCoords.latitude,
    placeCoords.longitude,
  );
  return distance * 1000 <= thresholdMeters;
}

/** Расстояние между точками в метрах */
export function getDistanceMeters(from: Coordinates, to: Coordinates): number {
  return (
    calculateDistance(
      from.latitude,
      from.longitude,
      to.latitude,
      to.longitude,
    ) * 1000
  );
}

/** Формула Гаверсина */
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/** Поиск мест */
export async function searchPlaces(query: string): Promise<Place[]> {
  const all = await getAllPlaces();
  const lowerQuery = query.toLowerCase();
  return all.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery),
  );
}
