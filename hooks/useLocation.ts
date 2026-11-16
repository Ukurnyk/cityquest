/**
 * Хук для работы с геолокацией
 */
import * as Location from 'expo-location';
import { useCallback, useEffect, useState } from 'react';
import { Coordinates, LocationData } from '../types';

interface UseLocationResult {
  location: LocationData | null;
  error: string | null;
  loading: boolean;
  refresh: () => Promise<void>;
}

type LocationResult = { location: LocationData } | { error: string };

/** Запрашивает разрешение и текущую позицию. Состояние хука не меняет. */
async function requestLocation(): Promise<LocationResult> {
  try {
    // Запрашиваем разрешение
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== 'granted') {
      return { error: 'Для работы приложения необходим доступ к геолокации' };
    }

    // Получаем текущую позицию
    const currentLocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return {
      location: {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        accuracy: currentLocation.coords.accuracy ?? 0,
        timestamp: currentLocation.timestamp,
      },
    };
  } catch (err) {
    console.error('Location error:', err);
    return { error: 'Не удалось определить местоположение' };
  }
}

export function useLocation(): UseLocationResult {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const applyResult = useCallback((result: LocationResult) => {
    if ('location' in result) {
      setLocation(result.location);
    } else {
      setError(result.error);
    }
    setLoading(false);
  }, []);

  // Повторный запрос по действию пользователя: сбрасываем состояние и запрашиваем заново
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    applyResult(await requestLocation());
  }, [applyResult]);

  useEffect(() => {
    requestLocation().then(applyResult);
  }, [applyResult]);

  return {
    location,
    error,
    loading,
    refresh,
  };
}

// Хук для отслеживания позиции в реальном времени
interface UseWatchLocationResult extends UseLocationResult {
  isWatching: boolean;
  startWatching: () => Promise<void>;
  stopWatching: () => void;
}

export function useWatchLocation(): UseWatchLocationResult {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWatching, setIsWatching] = useState(false);
  const [subscription, setSubscription] =
    useState<Location.LocationSubscription | null>(null);

  const startWatching = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setError('Для работы приложения необходим доступ к геолокации');
        setLoading(false);
        return;
      }

      const sub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 10, // обновлять каждые 10 метров
          timeInterval: 5000, // или каждые 5 секунд
        },
        (newLocation) => {
          setLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
            accuracy: newLocation.coords.accuracy ?? 0,
            timestamp: newLocation.timestamp,
          });
          setLoading(false);
        },
      );

      setSubscription(sub);
      setIsWatching(true);
    } catch (err) {
      setError('Не удалось начать отслеживание местоположения');
      console.error('Watch location error:', err);
      setLoading(false);
    }
  }, []);

  const stopWatching = useCallback(() => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
    setIsWatching(false);
  }, [subscription]);

  const refresh = useCallback(async () => {
    if (isWatching) {
      stopWatching();
    }
    await startWatching();
  }, [isWatching, stopWatching, startWatching]);

  useEffect(() => {
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [subscription]);

  return {
    location,
    error,
    loading,
    isWatching,
    startWatching,
    stopWatching,
    refresh,
  };
}

// Дефолтные координаты Чебоксар
export const CHEBOKSARY_COORDS: Coordinates = {
  latitude: 56.1391,
  longitude: 47.2487,
};
