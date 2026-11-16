/**
 * Глобальный QueryClient с настройками по умолчанию
 */
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Данные считаются свежими 5 минут — повторного запроса нет
      staleTime: 5 * 60 * 1000,
      // Хранить в кэше 10 минут после того как компонент размонтирован
      gcTime: 10 * 60 * 1000,
      // Не перезапрашивать при фокусе окна (мобильное приложение)
      refetchOnWindowFocus: false,
      // Повторять запрос 2 раза при ошибке
      retry: 2,
    },
  },
});
