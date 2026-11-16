/**
 * Сервис для работы с городами
 * Эндпоинты: /api/cities/*
 */
import { City } from '../types';
import { api } from './api';

/**
 * Получить список всех городов
 */
export async function getAllCities(): Promise<City[]> {
  return api.get<City[]>('/api/cities');
}

/**
 * Получить город по ID
 */
export async function getCityById(cityId: string): Promise<City> {
  return api.get<City>(`/api/cities/${cityId}`);
}
