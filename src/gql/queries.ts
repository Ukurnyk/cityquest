import { gql } from '@apollo/client';

export const GET_USER = gql`
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

export const GET_CITIES = gql`
  query GetCities {
    citiesList {
      id
      name
      description
      lat
      lon
    }
  }
`;

export const GET_USER_ACHIEVEMENTS = gql`
  query GetUserAchievements($userId: UUID!) {
    userAchievements(userId: $userId) {
      id
      progress
      isCompleted
      earnedAt
      achievement {
        id
        title
        description
        goal
        rewardScore
        iconUrl
        category {
          id
          name
        }
      }
    }
  }
`;
