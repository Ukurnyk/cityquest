export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** The `DateTime` scalar represents an ISO-8601 compliant date time type. */
  DateTime: { input: string; output: string; }
  UUID: { input: string; output: string; }
};

export type Achievement = {
  __typename?: 'Achievement';
  category: AchievementCategory;
  categoryId?: Maybe<Scalars['UUID']['output']>;
  city: City;
  cityId?: Maybe<Scalars['UUID']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  goal: Scalars['Int']['output'];
  iconUrl: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isPartner: Scalars['Boolean']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  rewardScore: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type AchievementCategory = {
  __typename?: 'AchievementCategory';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  name: Scalars['String']['output'];
};

/** Defines when a policy shall be executed. */
export type ApplyPolicy =
  /** After the resolver was executed. */
  | 'AFTER_RESOLVER'
  /** Before the resolver was executed. */
  | 'BEFORE_RESOLVER'
  /** The policy is applied in the validation step before the execution. */
  | 'VALIDATION';

export type City = {
  __typename?: 'City';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['UUID']['output'];
  lat?: Maybe<Scalars['Float']['output']>;
  lon?: Maybe<Scalars['Float']['output']>;
  name: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Мутация для создания пользователя, возвращает jwt токен */
  createUser: TokenPair;
  /** Временная мутация для дропа бд пользователей :) */
  deleteAllUsers: Scalars['Boolean']['output'];
  /** Мутация для авторизации пользователя, возвращает новый jwt токен */
  loginUser: TokenPair;
  /** Если jwt токен просрочен, кидаешь его сюда и сервер пытается его обновить, если всё хорошо то отправляет новый токен, иначе ловишь ошибку в лицо */
  tryRefreshAccessToken: Scalars['String']['output'];
};


export type MutationCreateUserArgs = {
  user: UserForCreateInput;
};


export type MutationLoginUserArgs = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationTryRefreshAccessTokenArgs = {
  refreshToken: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** AUTHORIZE-Получит информацию об ачивке по её id */
  achievementInfo: Achievement;
  /** AUTHORIZE-Получить список городов */
  citiesList: Array<City>;
  /** AUTHORIZE-Получить данные о городе */
  cityInfo: City;
  logout: Scalars['Boolean']['output'];
  /** Получить серверное время */
  serverCurrentDateTime: Scalars['DateTime']['output'];
  /** Получить серверное время по UTC */
  serverCurrentUTCDateTime: Scalars['DateTime']['output'];
  /** AUTHORIZE-Получит информацию об ачивке по её id */
  userAchievements: Array<UserAchievement>;
  /** AUTHORIZE-Получить данные о пользователе по его id */
  userById: User;
  /** AUTHORIZE-Получить данные о пользователе по его токену авторизации */
  userByToken: User;
  /** AUTHORIZE-Получит информацию об ачивке по её id */
  userCompletedAchievements: Array<UserAchievement>;
};


export type QueryAchievementInfoArgs = {
  achId: Scalars['UUID']['input'];
};


export type QueryCityInfoArgs = {
  cityId: Scalars['UUID']['input'];
};


export type QueryLogoutArgs = {
  token: Scalars['String']['input'];
};


export type QueryUserAchievementsArgs = {
  userId: Scalars['UUID']['input'];
};


export type QueryUserByIdArgs = {
  userId: Scalars['UUID']['input'];
};


export type QueryUserCompletedAchievementsArgs = {
  userId: Scalars['UUID']['input'];
};

export type TokenPair = {
  __typename?: 'TokenPair';
  accessToken: Scalars['String']['output'];
  refreshToken?: Maybe<Scalars['String']['output']>;
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  blockReason?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  isAdmin: Scalars['Boolean']['output'];
  isBlocked: Scalars['Boolean']['output'];
  username: Scalars['String']['output'];
};

export type UserAchievement = {
  __typename?: 'UserAchievement';
  achievement: Achievement;
  achievementId: Scalars['UUID']['output'];
  earnedAt: Scalars['DateTime']['output'];
  id: Scalars['UUID']['output'];
  isCompleted: Scalars['Boolean']['output'];
  progress: Scalars['Int']['output'];
  user: User;
  userId: Scalars['UUID']['output'];
};

export type UserForCreateInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};
