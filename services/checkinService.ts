/**
 * Сервис для QR-чекинов
 * Примечание: addPoints/addVisitedPlace/checkPlaceAchievements перенесены на бэкенд.
 * Чекин в этой версии только локально обновляет прогресс дневных заданий.
 */
import { Place, QRCheckin } from '../types';
import { updateTaskProgress } from './dailyService';
import { getAllPlaces } from './placesService';

// Имитация задержки сети
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Генерация QR-кода для места (в реальности генерируется на backend)
export function generateQRCode(placeId: string): QRCheckin {
  const validUntil = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  const code = `QUESTCITY-${placeId}-${Date.now().toString(36).toUpperCase()}`;

  return {
    placeId,
    validUntil,
    code,
  };
}

// Парсинг QR-кода
export async function parseQRCode(
  code: string,
): Promise<{ placeId: string; isValid: boolean } | null> {
  // Формат: QUESTCITY-{placeId}-{timestamp}
  const match = code.match(/^QUESTCITY-([\w-]+)-[A-Z0-9]+$/);

  if (!match) {
    return null;
  }

  const placeId = match[1];

  // Проверяем, существует ли место
  const places = await getAllPlaces();
  const place = places.find((p) => p.id === placeId);
  if (!place) {
    return { placeId, isValid: false };
  }

  return { placeId, isValid: true };
}

// Выполнить чекин
export async function performCheckin(qrCode: string): Promise<{
  success: boolean;
  place?: Place;
  pointsEarned?: number;
  bonusMultiplier?: number;
  newAchievements?: any[];
  error?: string;
}> {
  await delay(500);

  // Парсим QR-код
  const parsed = await parseQRCode(qrCode);
  if (!parsed) {
    return { success: false, error: 'Неверный формат QR-кода' };
  }

  if (!parsed.isValid) {
    return { success: false, error: 'Место не найдено' };
  }

  // Получаем место
  const places = await getAllPlaces();
  const place = places.find((p) => p.id === parsed.placeId);
  if (!place) {
    return { success: false, error: 'Место не найдено' };
  }

  // Бонусный множитель (сезонные ивенты пока не реализованы на бэкенде)
  const bonusMultiplier = 1;
  const pointsEarned = Math.round(place.points * bonusMultiplier);

  // Обновляем прогресс ежедневных заданий
  await updateTaskProgress('checkin', 1);
  await updateTaskProgress('visit', 1);

  return {
    success: true,
    place,
    pointsEarned,
    bonusMultiplier: bonusMultiplier > 1 ? bonusMultiplier : undefined,
    newAchievements: [],
  };
}

// Получить демо QR-коды для тестирования
export async function getDemoQRCodes(): Promise<
  {
    placeId: string;
    code: string;
    placeName: string;
  }[]
> {
  const places = await getAllPlaces();
  return places.map((place) => ({
    placeId: place.id,
    code: `QUESTCITY-${place.id}-DEMO${place.id}`,
    placeName: place.name,
  }));
}

// Валидация QR без чекина (для предпросмотра)
export async function validateQRCode(qrCode: string): Promise<{
  isValid: boolean;
  place?: Place;
  alreadyVisited?: boolean;
  error?: string;
}> {
  await delay(200);

  const parsed = await parseQRCode(qrCode);
  if (!parsed || !parsed.isValid) {
    return { isValid: false, error: 'Неверный QR-код' };
  }

  const places = await getAllPlaces();
  const place = places.find((p) => p.id === parsed.placeId);
  if (!place) {
    return { isValid: false, error: 'Место не найдено' };
  }

  return {
    isValid: true,
    place,
    alreadyVisited: false, // определяется на бэкенде в будущем
  };
}
