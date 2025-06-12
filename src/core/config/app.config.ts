export const AppConfig = {
  API_URL: process.env.API_URL || 'https://api.questly.com',
  MAP_API_KEY: process.env.MAP_API_KEY,
  STORAGE_KEYS: {
    AUTH_TOKEN: '@questly/auth_token',
    USER_DATA: '@questly/user_data',
  },
  CACHE_DURATION: 1000 * 60 * 5, // 5 minutes
} as const;
