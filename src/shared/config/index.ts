// Конфигурация приложения
export const API_CONFIG = {
  BASE_URL: 'https://66187e349a41b1b3dfbe040c.mockapi.io/api/v1',
  TIMEOUT: 5000,
};

// Конфигурация роутинга
export const ROUTES = {
  LOGIN: '/login',
  USERS: '/users',
  NOT_FOUND: '*',
  404: '/404', // Добавляем явный путь для 404
};

// Конфигурация авторизации
export const AUTH_CONFIG = {
  TOKEN_KEY: 'user_token',
  DEFAULT_CREDENTIALS: {
    login: 'admin',
    password: 'admin',
  },
};