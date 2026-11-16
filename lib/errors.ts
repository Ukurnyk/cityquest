/**
 * Текст ошибки для пользователя
 */
import { ApiError } from '@/services/api';

export function getErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 401) return 'Сессия истекла. Войдите снова.';
    if (error.status >= 500) return 'Сервер временно недоступен.';
    return error.message;
  }
  // fetch бросает не ApiError, если запрос не дошёл до сервера
  return 'Не удалось связаться с сервером. Проверьте подключение к интернету.';
}
