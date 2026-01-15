export const API_CONFIG = {
  BASE_URL: 'https://696949e969178471522d1f92.mockapi.io/api/v1',
  TIMEOUT: 5000,
};

export const ROUTES = {
  LOGIN: '/login',
  USERS: '/users',
  NOT_FOUND: '*',
  404: '/404',
};

export const AUTH_CONFIG = {
  TOKEN_KEY: 'user_token',
  DEFAULT_CREDENTIALS: {
    login: 'admin',
    password: 'admin',
  },
};