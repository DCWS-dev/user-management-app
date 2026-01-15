import { useMutation } from '@tanstack/react-query';
import { authAPI } from '@/shared/api/auth';
import { useAuth } from '@/entities/session/model/useAuth';
import { notification } from 'antd';

export const useLoginMutation = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: ({ login: username, password }: { login: string; password: string }) => 
      authAPI.login(username, password),
    onSuccess: (token: string) => {
      login(token);
      notification.success({
        message: 'Успешный вход',
        description: 'Вы успешно вошли в систему',
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: 'Ошибка входа',
        description: error.message,
      });
    },
  });
};