/**
 * Сервис для работы с локальным хранилищем
 */
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  USER_DATA: '@questcity_user',
  VISITED_PLACES: '@questcity_visited',
  ACHIEVEMENTS: '@questcity_achievements',
  STREAK: '@questcity_streak',
  DAILY_TASKS: '@questcity_daily',
  PHOTOS: '@questcity_photos',
  QUEST_PROGRESS: '@questcity_quests',
  SETTINGS: '@questcity_settings',
} as const;

// Сохранить данные
export async function saveData<T>(key: string, value: T): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
}

// Загрузить данные
export async function loadData<T>(key: string): Promise<T | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error loading data:', error);
    return null;
  }
}

// Удалить данные
export async function removeData(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing data:', error);
    throw error;
  }
}

// Очистить всё хранилище
export async function clearAllData(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing data:', error);
    throw error;
  }
}

// Получить все ключи
export async function getAllKeys(): Promise<string[]> {
  try {
    return (await AsyncStorage.getAllKeys()) as string[];
  } catch (error) {
    console.error('Error getting keys:', error);
    return [];
  }
}

export { STORAGE_KEYS };
