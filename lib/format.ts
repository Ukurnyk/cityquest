/**
 * Форматирование значений для UI
 */

/** 350 м, 1.2 км */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} м`;
  return `${(meters / 1000).toFixed(1)} км`;
}
