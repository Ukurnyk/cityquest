/**
 * Query-хуки для работы с местами
 * Заменяют useState+useEffect паттерн с автоматическим кэшированием
 */
import {
  getAllPlaces,
  getNearbyPlaces,
  getPlacesByCategory,
  searchPlaces,
} from '@/services/placesService';
import { Coordinates, Place, PlaceCategory } from '@/types';
import { useQuery } from '@tanstack/react-query';

// ─── Ключи запросов ──────────────────────────────────────────────────────────

export const placeKeys = {
  all: ['places'] as const,
  nearby: (coords: Coordinates, radiusKm: number) =>
    ['places', 'nearby', coords, radiusKm] as const,
  byCategory: (category: PlaceCategory) =>
    ['places', 'category', category] as const,
  search: (query: string) => ['places', 'search', query] as const,
};

// ─── Хуки ────────────────────────────────────────────────────────────────────

/** Все места (через ачивки города) — кэш 5 минут */
export function usePlaces() {
  return useQuery<Place[]>({
    queryKey: placeKeys.all,
    queryFn: getAllPlaces,
  });
}

/** Ближайшие места */
export function useNearbyPlaces(
  coords: Coordinates | null,
  radiusKm: number = 2,
) {
  return useQuery<Place[]>({
    queryKey: placeKeys.nearby(
      coords ?? { latitude: 0, longitude: 0 },
      radiusKm,
    ),
    queryFn: () => getNearbyPlaces(coords!, radiusKm),
    enabled: !!coords,
  });
}

/** Места по категории */
export function usePlacesByCategory(category: PlaceCategory | 'all') {
  return useQuery<Place[]>({
    queryKey:
      category === 'all' ? placeKeys.all : placeKeys.byCategory(category),
    queryFn:
      category === 'all' ? getAllPlaces : () => getPlacesByCategory(category),
  });
}

/** Поиск мест */
export function usePlacesSearch(query: string) {
  return useQuery<Place[]>({
    queryKey: placeKeys.search(query),
    queryFn: () => searchPlaces(query),
    enabled: query.trim().length > 0,
  });
}
