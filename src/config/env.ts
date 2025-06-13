import Config from 'react-native-config';

console.log('Config values:', {
  GRAPHQL_ENDPOINT: Config.GRAPHQL_ENDPOINT,
  API_URL: Config.API_URL,
  APP_ENV: Config.APP_ENV,
});

export const ENV = {
  GRAPHQL_ENDPOINT: Config.GRAPHQL_ENDPOINT,
  API_URL: Config.API_URL,
  APP_ENV: Config.APP_ENV,
} as const;

export type EnvKey = keyof typeof ENV;
export type EnvValue = (typeof ENV)[EnvKey];
