/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
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
  lng?: Maybe<Scalars['Float']['output']>;
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
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

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
  createUser: Scalars['String']['output'];
  /** Мутация для авторизации пользователя, возвращает новый jwt токен */
  loginUser: Scalars['String']['output'];
  /** Если jwt токен просрочен, кидаешь его сюда и сервер пытается его обновить, если всё хорошо то отправляет новый токен, иначе ловишь ошибку в лицо */
  tryRefreshToken: Scalars['String']['output'];
};


export type MutationCreateUserArgs = {
  user: UserForCreateInput;
};


export type MutationLoginUserArgs = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationTryRefreshTokenArgs = {
  oldToken: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** AUTHORIZE-Получит информацию об ачивке по её id */
  achievementInfo: Achievement;
  /** AUTHORIZE-Получить список городов */
  citiesList: Array<City>;
  /** AUTHORIZE-Получить данные о городе */
  cityInfo: City;
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


export type QueryUserAchievementsArgs = {
  userId: Scalars['UUID']['input'];
};


export type QueryUserByIdArgs = {
  userId: Scalars['UUID']['input'];
};


export type QueryUserCompletedAchievementsArgs = {
  userId: Scalars['UUID']['input'];
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  city?: Maybe<City>;
  cityId: Scalars['UUID']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  passwordHash: Scalars['String']['output'];
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
  cityId: Scalars['UUID']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', userByToken: { __typename?: 'User', id: string, username: string, email: string, avatarUrl?: string | null, city?: { __typename?: 'City', id: string, name: string } | null } };

export type PingQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQuery = { __typename?: 'Query', serverCurrentDateTime: string };

export type CreateUserMutationVariables = Exact<{
  user: UserForCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: string };


export const GetUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userByToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"avatarUrl"}},{"kind":"Field","name":{"kind":"Name","value":"city"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetUserQuery, GetUserQueryVariables>;
export const PingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Ping"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"serverCurrentDateTime"}}]}}]} as unknown as DocumentNode<PingQuery, PingQueryVariables>;
export const CreateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"user"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UserForCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createUser"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"user"},"value":{"kind":"Variable","name":{"kind":"Name","value":"user"}}}]}]}}]} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
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
  lng?: Maybe<Scalars['Float']['output']>;
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
export enum ApplyPolicy {
  /** After the resolver was executed. */
  AfterResolver = 'AFTER_RESOLVER',
  /** Before the resolver was executed. */
  BeforeResolver = 'BEFORE_RESOLVER',
  /** The policy is applied in the validation step before the execution. */
  Validation = 'VALIDATION'
}

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
  createUser: Scalars['String']['output'];
  /** Мутация для авторизации пользователя, возвращает новый jwt токен */
  loginUser: Scalars['String']['output'];
  /** Если jwt токен просрочен, кидаешь его сюда и сервер пытается его обновить, если всё хорошо то отправляет новый токен, иначе ловишь ошибку в лицо */
  tryRefreshToken: Scalars['String']['output'];
};


export type MutationCreateUserArgs = {
  user: UserForCreateInput;
};


export type MutationLoginUserArgs = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationTryRefreshTokenArgs = {
  oldToken: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  /** AUTHORIZE-Получит информацию об ачивке по её id */
  achievementInfo: Achievement;
  /** AUTHORIZE-Получить список городов */
  citiesList: Array<City>;
  /** AUTHORIZE-Получить данные о городе */
  cityInfo: City;
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


export type QueryUserAchievementsArgs = {
  userId: Scalars['UUID']['input'];
};


export type QueryUserByIdArgs = {
  userId: Scalars['UUID']['input'];
};


export type QueryUserCompletedAchievementsArgs = {
  userId: Scalars['UUID']['input'];
};

export type User = {
  __typename?: 'User';
  avatarUrl?: Maybe<Scalars['String']['output']>;
  city?: Maybe<City>;
  cityId: Scalars['UUID']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['UUID']['output'];
  passwordHash: Scalars['String']['output'];
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
  cityId: Scalars['UUID']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', userByToken: { __typename?: 'User', id: string, username: string, email: string, avatarUrl?: string | null, city?: { __typename?: 'City', id: string, name: string } | null } };

export type PingQueryVariables = Exact<{ [key: string]: never; }>;


export type PingQuery = { __typename?: 'Query', serverCurrentDateTime: string };

export type CreateUserMutationVariables = Exact<{
  user: UserForCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: string };


export const GetUserDocument = gql`
    query GetUser {
  userByToken {
    id
    username
    email
    avatarUrl
    city {
      id
      name
    }
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const PingDocument = gql`
    query Ping {
  serverCurrentDateTime
}
    `;

/**
 * __usePingQuery__
 *
 * To run a query within a React component, call `usePingQuery` and pass it any options that fit your needs.
 * When your component renders, `usePingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePingQuery({
 *   variables: {
 *   },
 * });
 */
export function usePingQuery(baseOptions?: Apollo.QueryHookOptions<PingQuery, PingQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PingQuery, PingQueryVariables>(PingDocument, options);
      }
export function usePingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PingQuery, PingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PingQuery, PingQueryVariables>(PingDocument, options);
        }
export function usePingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<PingQuery, PingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<PingQuery, PingQueryVariables>(PingDocument, options);
        }
export type PingQueryHookResult = ReturnType<typeof usePingQuery>;
export type PingLazyQueryHookResult = ReturnType<typeof usePingLazyQuery>;
export type PingSuspenseQueryHookResult = ReturnType<typeof usePingSuspenseQuery>;
export type PingQueryResult = Apollo.QueryResult<PingQuery, PingQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($user: UserForCreateInput!) {
  createUser(user: $user)
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;