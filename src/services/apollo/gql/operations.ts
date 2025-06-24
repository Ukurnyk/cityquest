import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', userByToken: { __typename?: 'User', id: string, username: string, email: string, createdAt: string, avatarUrl?: string | null, isBlocked: boolean, blockReason?: string | null, isAdmin: boolean } };

export type CreateUserMutationVariables = Types.Exact<{
  user: Types.UserForCreateInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'TokenPair', accessToken: string, refreshToken?: string | null } };

export type LoginUserMutationVariables = Types.Exact<{
  login: Types.Scalars['String']['input'];
  password: Types.Scalars['String']['input'];
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'TokenPair', accessToken: string, refreshToken?: string | null } };

export type GetUserByIdQueryVariables = Types.Exact<{
  userId: Types.Scalars['UUID']['input'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', userById: { __typename?: 'User', id: string, username: string, email: string, createdAt: string, avatarUrl?: string | null, isBlocked: boolean, blockReason?: string | null, isAdmin: boolean } };

export type GetAchievementInfoQueryVariables = Types.Exact<{
  achId: Types.Scalars['UUID']['input'];
}>;


export type GetAchievementInfoQuery = { __typename?: 'Query', achievementInfo: { __typename?: 'Achievement', id: string, title: string, description: string, goal: number, rewardScore: number, cityId?: string | null, iconUrl: string, lat?: number | null, lon?: number | null, categoryId?: string | null, isPartner: boolean, createdAt: string, city: { __typename?: 'City', id: string, name: string, description?: string | null, lat?: number | null, lon?: number | null }, category: { __typename?: 'AchievementCategory', id: string, name: string, description?: string | null } } };

export type GetUserCompletedAchievementsQueryVariables = Types.Exact<{
  userId: Types.Scalars['UUID']['input'];
}>;


export type GetUserCompletedAchievementsQuery = { __typename?: 'Query', userCompletedAchievements: Array<{ __typename?: 'UserAchievement', id: string, userId: string, achievementId: string, progress: number, isCompleted: boolean, earnedAt: string, user: { __typename?: 'User', id: string, username: string, email: string }, achievement: { __typename?: 'Achievement', id: string, title: string, description: string, goal: number, rewardScore: number, iconUrl: string } }> };

export type GetUserAchievementsQueryVariables = Types.Exact<{
  userId: Types.Scalars['UUID']['input'];
}>;


export type GetUserAchievementsQuery = { __typename?: 'Query', userAchievements: Array<{ __typename?: 'UserAchievement', id: string, userId: string, achievementId: string, progress: number, isCompleted: boolean, earnedAt: string, user: { __typename?: 'User', id: string, username: string, email: string }, achievement: { __typename?: 'Achievement', id: string, title: string, description: string, goal: number, rewardScore: number, iconUrl: string } }> };

export type GetCityInfoQueryVariables = Types.Exact<{
  cityId: Types.Scalars['UUID']['input'];
}>;


export type GetCityInfoQuery = { __typename?: 'Query', cityInfo: { __typename?: 'City', id: string, name: string, description?: string | null, lat?: number | null, lon?: number | null } };

export type GetCitiesListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCitiesListQuery = { __typename?: 'Query', citiesList: Array<{ __typename?: 'City', id: string, name: string, description?: string | null, lat?: number | null, lon?: number | null }> };


export const GetUserDocument = gql`
    query GetUser {
  userByToken {
    id
    username
    email
    createdAt
    avatarUrl
    isBlocked
    blockReason
    isAdmin
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
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<Types.GetUserQuery, Types.GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetUserQuery, Types.GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetUserQuery, Types.GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetUserQuery, Types.GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetUserQuery, Types.GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetUserQuery, Types.GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<Types.GetUserQuery, Types.GetUserQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($user: UserForCreateInput!) {
  createUser(user: $user) {
    accessToken
    refreshToken
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<Types.CreateUserMutation, Types.CreateUserMutationVariables>;

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
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<Types.CreateUserMutation, Types.CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.CreateUserMutation, Types.CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<Types.CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<Types.CreateUserMutation, Types.CreateUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($login: String!, $password: String!) {
  loginUser(login: $login, password: $password) {
    accessToken
    refreshToken
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<Types.LoginUserMutation, Types.LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      login: // value for 'login'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<Types.LoginUserMutation, Types.LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.LoginUserMutation, Types.LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<Types.LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<Types.LoginUserMutation, Types.LoginUserMutationVariables>;
export const GetUserByIdDocument = gql`
    query GetUserById($userId: UUID!) {
  userById(userId: $userId) {
    id
    username
    email
    createdAt
    avatarUrl
    isBlocked
    blockReason
    isAdmin
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables> & ({ variables: Types.GetUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export function useGetUserByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetUserByIdSuspenseQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<Types.GetUserByIdQuery, Types.GetUserByIdQueryVariables>;
export const GetAchievementInfoDocument = gql`
    query GetAchievementInfo($achId: UUID!) {
  achievementInfo(achId: $achId) {
    id
    title
    description
    goal
    rewardScore
    cityId
    city {
      id
      name
      description
      lat
      lon
    }
    iconUrl
    lat
    lon
    categoryId
    category {
      id
      name
      description
    }
    isPartner
    createdAt
  }
}
    `;

/**
 * __useGetAchievementInfoQuery__
 *
 * To run a query within a React component, call `useGetAchievementInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAchievementInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAchievementInfoQuery({
 *   variables: {
 *      achId: // value for 'achId'
 *   },
 * });
 */
export function useGetAchievementInfoQuery(baseOptions: Apollo.QueryHookOptions<Types.GetAchievementInfoQuery, Types.GetAchievementInfoQueryVariables> & ({ variables: Types.GetAchievementInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetAchievementInfoQuery, Types.GetAchievementInfoQueryVariables>(GetAchievementInfoDocument, options);
      }
export function useGetAchievementInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetAchievementInfoQuery, Types.GetAchievementInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetAchievementInfoQuery, Types.GetAchievementInfoQueryVariables>(GetAchievementInfoDocument, options);
        }
export function useGetAchievementInfoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetAchievementInfoQuery, Types.GetAchievementInfoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetAchievementInfoQuery, Types.GetAchievementInfoQueryVariables>(GetAchievementInfoDocument, options);
        }
export type GetAchievementInfoQueryHookResult = ReturnType<typeof useGetAchievementInfoQuery>;
export type GetAchievementInfoLazyQueryHookResult = ReturnType<typeof useGetAchievementInfoLazyQuery>;
export type GetAchievementInfoSuspenseQueryHookResult = ReturnType<typeof useGetAchievementInfoSuspenseQuery>;
export type GetAchievementInfoQueryResult = Apollo.QueryResult<Types.GetAchievementInfoQuery, Types.GetAchievementInfoQueryVariables>;
export const GetUserCompletedAchievementsDocument = gql`
    query GetUserCompletedAchievements($userId: UUID!) {
  userCompletedAchievements(userId: $userId) {
    id
    userId
    user {
      id
      username
      email
    }
    achievementId
    achievement {
      id
      title
      description
      goal
      rewardScore
      iconUrl
    }
    progress
    isCompleted
    earnedAt
  }
}
    `;

/**
 * __useGetUserCompletedAchievementsQuery__
 *
 * To run a query within a React component, call `useGetUserCompletedAchievementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserCompletedAchievementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserCompletedAchievementsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserCompletedAchievementsQuery(baseOptions: Apollo.QueryHookOptions<Types.GetUserCompletedAchievementsQuery, Types.GetUserCompletedAchievementsQueryVariables> & ({ variables: Types.GetUserCompletedAchievementsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetUserCompletedAchievementsQuery, Types.GetUserCompletedAchievementsQueryVariables>(GetUserCompletedAchievementsDocument, options);
      }
export function useGetUserCompletedAchievementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetUserCompletedAchievementsQuery, Types.GetUserCompletedAchievementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetUserCompletedAchievementsQuery, Types.GetUserCompletedAchievementsQueryVariables>(GetUserCompletedAchievementsDocument, options);
        }
export function useGetUserCompletedAchievementsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetUserCompletedAchievementsQuery, Types.GetUserCompletedAchievementsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetUserCompletedAchievementsQuery, Types.GetUserCompletedAchievementsQueryVariables>(GetUserCompletedAchievementsDocument, options);
        }
export type GetUserCompletedAchievementsQueryHookResult = ReturnType<typeof useGetUserCompletedAchievementsQuery>;
export type GetUserCompletedAchievementsLazyQueryHookResult = ReturnType<typeof useGetUserCompletedAchievementsLazyQuery>;
export type GetUserCompletedAchievementsSuspenseQueryHookResult = ReturnType<typeof useGetUserCompletedAchievementsSuspenseQuery>;
export type GetUserCompletedAchievementsQueryResult = Apollo.QueryResult<Types.GetUserCompletedAchievementsQuery, Types.GetUserCompletedAchievementsQueryVariables>;
export const GetUserAchievementsDocument = gql`
    query GetUserAchievements($userId: UUID!) {
  userAchievements(userId: $userId) {
    id
    userId
    user {
      id
      username
      email
    }
    achievementId
    achievement {
      id
      title
      description
      goal
      rewardScore
      iconUrl
    }
    progress
    isCompleted
    earnedAt
  }
}
    `;

/**
 * __useGetUserAchievementsQuery__
 *
 * To run a query within a React component, call `useGetUserAchievementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserAchievementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserAchievementsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useGetUserAchievementsQuery(baseOptions: Apollo.QueryHookOptions<Types.GetUserAchievementsQuery, Types.GetUserAchievementsQueryVariables> & ({ variables: Types.GetUserAchievementsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetUserAchievementsQuery, Types.GetUserAchievementsQueryVariables>(GetUserAchievementsDocument, options);
      }
export function useGetUserAchievementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetUserAchievementsQuery, Types.GetUserAchievementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetUserAchievementsQuery, Types.GetUserAchievementsQueryVariables>(GetUserAchievementsDocument, options);
        }
export function useGetUserAchievementsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetUserAchievementsQuery, Types.GetUserAchievementsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetUserAchievementsQuery, Types.GetUserAchievementsQueryVariables>(GetUserAchievementsDocument, options);
        }
export type GetUserAchievementsQueryHookResult = ReturnType<typeof useGetUserAchievementsQuery>;
export type GetUserAchievementsLazyQueryHookResult = ReturnType<typeof useGetUserAchievementsLazyQuery>;
export type GetUserAchievementsSuspenseQueryHookResult = ReturnType<typeof useGetUserAchievementsSuspenseQuery>;
export type GetUserAchievementsQueryResult = Apollo.QueryResult<Types.GetUserAchievementsQuery, Types.GetUserAchievementsQueryVariables>;
export const GetCityInfoDocument = gql`
    query GetCityInfo($cityId: UUID!) {
  cityInfo(cityId: $cityId) {
    id
    name
    description
    lat
    lon
  }
}
    `;

/**
 * __useGetCityInfoQuery__
 *
 * To run a query within a React component, call `useGetCityInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCityInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCityInfoQuery({
 *   variables: {
 *      cityId: // value for 'cityId'
 *   },
 * });
 */
export function useGetCityInfoQuery(baseOptions: Apollo.QueryHookOptions<Types.GetCityInfoQuery, Types.GetCityInfoQueryVariables> & ({ variables: Types.GetCityInfoQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetCityInfoQuery, Types.GetCityInfoQueryVariables>(GetCityInfoDocument, options);
      }
export function useGetCityInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetCityInfoQuery, Types.GetCityInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetCityInfoQuery, Types.GetCityInfoQueryVariables>(GetCityInfoDocument, options);
        }
export function useGetCityInfoSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetCityInfoQuery, Types.GetCityInfoQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetCityInfoQuery, Types.GetCityInfoQueryVariables>(GetCityInfoDocument, options);
        }
export type GetCityInfoQueryHookResult = ReturnType<typeof useGetCityInfoQuery>;
export type GetCityInfoLazyQueryHookResult = ReturnType<typeof useGetCityInfoLazyQuery>;
export type GetCityInfoSuspenseQueryHookResult = ReturnType<typeof useGetCityInfoSuspenseQuery>;
export type GetCityInfoQueryResult = Apollo.QueryResult<Types.GetCityInfoQuery, Types.GetCityInfoQueryVariables>;
export const GetCitiesListDocument = gql`
    query GetCitiesList {
  citiesList {
    id
    name
    description
    lat
    lon
  }
}
    `;

/**
 * __useGetCitiesListQuery__
 *
 * To run a query within a React component, call `useGetCitiesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCitiesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCitiesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCitiesListQuery(baseOptions?: Apollo.QueryHookOptions<Types.GetCitiesListQuery, Types.GetCitiesListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.GetCitiesListQuery, Types.GetCitiesListQueryVariables>(GetCitiesListDocument, options);
      }
export function useGetCitiesListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.GetCitiesListQuery, Types.GetCitiesListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.GetCitiesListQuery, Types.GetCitiesListQueryVariables>(GetCitiesListDocument, options);
        }
export function useGetCitiesListSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.GetCitiesListQuery, Types.GetCitiesListQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.GetCitiesListQuery, Types.GetCitiesListQueryVariables>(GetCitiesListDocument, options);
        }
export type GetCitiesListQueryHookResult = ReturnType<typeof useGetCitiesListQuery>;
export type GetCitiesListLazyQueryHookResult = ReturnType<typeof useGetCitiesListLazyQuery>;
export type GetCitiesListSuspenseQueryHookResult = ReturnType<typeof useGetCitiesListSuspenseQuery>;
export type GetCitiesListQueryResult = Apollo.QueryResult<Types.GetCitiesListQuery, Types.GetCitiesListQueryVariables>;