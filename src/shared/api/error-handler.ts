import { notification } from 'antd';
import { AxiosError } from 'axios';

export const handleApiError = (error: unknown): void => {
  if (error instanceof AxiosError) {
    if (error.response?.status === 404) {
      notification.error({
        message: 'Ресурс не найден',
        description: 'Запрашиваемый ресурс не существует или был удален.',
      });
    } else if (error.response?.status === 401) {
      notification.error({
        message: 'Ошибка авторизации',
        description: 'Ваша сессия истекла. Пожалуйста, войдите снова.',
      });
      // Автоматический редирект на логин
      localStorage.removeItem('user_token');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      notification.error({
        message: 'Доступ запрещен',
        description: 'У вас нет прав для выполнения этого действия.',
      });
    } else {
      notification.error({
        message: 'Ошибка сервера',
        description: 'Произошла ошибка при обработке запроса. Пожалуйста, попробуйте позже.',
      });
    }
  } else if (error instanceof Error) {
    notification.error({
      message: 'Ошибка',
      description: error.message,
    });
  } else {
    notification.error({
      message: 'Неизвестная ошибка',
      description: 'Произошла неизвестная ошибка',
    });
  }
};