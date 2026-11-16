/**
 * Подписи и иконки категорий мест
 */
import { MaterialIcons } from '@expo/vector-icons';

import { PlaceCategory } from '@/types';

export const categoryIcons: Record<
  PlaceCategory,
  keyof typeof MaterialIcons.glyphMap
> = {
  museum: 'museum',
  cafe: 'local-cafe',
  park: 'park',
  landmark: 'location-city',
  event: 'event',
};

export const categoryLabels: Record<PlaceCategory, string> = {
  museum: 'Музей',
  cafe: 'Кафе',
  park: 'Парк',
  landmark: 'Достопримечательность',
  event: 'Мероприятие',
};
