// Имитация API авторизации
export const authAPI = {
  login: async (login: string, password: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (login === 'admin' && password === 'admin') {
          const token = 'fake-jwt-token-' + Date.now();
          resolve(token);
        } else {
          reject(new Error('Неверные учетные данные. Используйте admin/admin'));
        }
      }, 2000); // Имитация задержки сети
    });
  },

  logout: (): Promise<void> => {
    return Promise.resolve();
  }
};