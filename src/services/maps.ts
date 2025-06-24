import Yamap from '@ilalovmz/react-native-yamap';
import { ENV } from '@/shared/config/env';

export interface MapPoint {
  lat: number;
  lon: number;
}

export interface MapRegion extends MapPoint {
  zoom: number;
}

export const MAPS_CONFIG = {
  apiKey: ENV.YANDEX_MAPS_APIKEY,
  defaultCenter: {
    latitude: 55.7558,
    longitude: 37.6176,
  },
  defaultZoom: 10,
} as const;

class YandexMapsService {
  private static instance: YandexMapsService;
  private initialized: boolean = false;
  private initPromise: Promise<boolean> | null = null;
  private initError: Error | null = null;

  private constructor() {}

  static getInstance(): YandexMapsService {
    if (!YandexMapsService.instance) {
      YandexMapsService.instance = new YandexMapsService();
    }
    return YandexMapsService.instance;
  }

  async init(): Promise<boolean> {
    if (this.initialized) {
      console.log('[YandexMapsService] Already initialized');
      return true;
    }

    // Если была ошибка инициализации, сбрасываем её
    if (this.initError) {
      this.initError = null;
    }

    // Если инициализация уже запущена, возвращаем существующий промис
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = new Promise(async (resolve, reject) => {
      try {
        // Создаем таймаут
        const timeout = new Promise<boolean>((_, reject) => {
          setTimeout(() => {
            reject(new Error('Map initialization timeout'));
          }, 20000); // 20 секунд таймаут
        });

        console.log(
          '[YandexMapsService] Initializing with API key:',
          ENV.YANDEX_MAPS_APIKEY ? '***' : 'NOT SET'
        );

        // Проверяем API ключ
        if (!ENV.YANDEX_MAPS_APIKEY) {
          throw new Error('Yandex Maps API key is not configured');
        }

        // Добавляем небольшую задержку перед инициализацией
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Запускаем инициализацию с таймаутом
        const initResult = await Promise.race([
          Yamap.init(ENV.YANDEX_MAPS_APIKEY),
          timeout,
        ]);

        this.initialized = true;
        this.initError = null;
        console.log('[YandexMapsService] Successfully initialized');
        resolve(true);
      } catch (error) {
        console.error('[YandexMapsService] Initialization failed:', error);
        this.initialized = false;
        this.initError =
          error instanceof Error
            ? error
            : new Error('Unknown initialization error');
        this.initPromise = null;
        reject(error);
      }
    });

    try {
      return await this.initPromise;
    } catch (error) {
      this.initPromise = null;
      throw error;
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  getLastError(): Error | null {
    return this.initError;
  }

  reset(): void {
    this.initialized = false;
    this.initPromise = null;
    this.initError = null;
  }

  // Вспомогательные методы для работы с картой
  validateCoordinates(point: Partial<MapPoint>): boolean {
    try {
      if (!point.lat || !point.lon) return false;
      return (
        point.lat >= -90 &&
        point.lat <= 90 &&
        point.lon >= -180 &&
        point.lon <= 180
      );
    } catch (error) {
      console.error('[YandexMapsService] Error validating coordinates:', error);
      return false;
    }
  }

  getDefaultRegion(): MapRegion {
    return {
      lat: 56.1322, // Чебоксары
      lon: 47.2519,
      zoom: 12,
    };
  }
}

export const mapsService = YandexMapsService.getInstance();
