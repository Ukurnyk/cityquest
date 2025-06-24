// Экспортируем сгенерированные типы из codegen
export * from './gql/types';

// Дополнительные типы для совместимости с доменными сущностями
import { User as DomainUser } from '@/domain/entities/User';
import { Quest as DomainQuest } from '@/domain/entities/Quest';
import { Achievement as DomainAchievement } from '@/domain/entities/Achievement';

// Расширяем сгенерированные типы для совместимости с доменными сущностями
export interface User extends DomainUser {}

export interface Quest extends DomainQuest {}

export interface Achievement extends DomainAchievement {}

// Типы для ввода данных
export interface UserForCreateInput {
  username: string;
  email: string;
  password: string;
}

// Типы для ответов GraphQL
export interface GetUserResponse {
  userByToken: User;
}

export interface CreateUserResponse {
  createUser: {
    accessToken: string;
    refreshToken?: string;
  };
}

export interface LoginUserResponse {
  loginUser: {
    accessToken: string;
    refreshToken?: string;
  };
}

// City types
export interface City {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  quests: Quest[];
}

// Location types
export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
}

export interface GetQuestsResponse {
  quests: Quest[];
}

export interface GetQuestByIdResponse {
  quest: Quest;
}

export interface GetAchievementsResponse {
  achievements: Achievement[];
}

export interface CompleteAchievementResponse {
  completeAchievement: Achievement;
}

export interface GetCitiesResponse {
  cities: City[];
}

export interface GetLocationsResponse {
  locations: Location[];
}
