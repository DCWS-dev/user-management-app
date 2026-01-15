import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersAPI, User, CreateUserDto, UpdateUserDto } from '@/shared/api/users';
import { App } from 'antd';

const USERS_QUERY_KEY = ['users'];

export const useUsers = () => {
  return useQuery({
    queryKey: USERS_QUERY_KEY,
    queryFn: usersAPI.getUsers,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  return useMutation({
    mutationFn: usersAPI.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      notification.success({
        message: 'Пользователь создан',
        description: 'Новый пользователь успешно добавлен',
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: 'Ошибка создания',
        description: error.message || 'Не удалось создать пользователя',
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      usersAPI.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      notification.success({
        message: 'Пользователь обновлен',
        description: 'Данные пользователя успешно изменены',
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: 'Ошибка обновления',
        description: error.message || 'Не удалось обновить пользователя',
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { notification } = App.useApp();

  return useMutation({
    mutationFn: usersAPI.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
      notification.success({
        message: 'Пользователь удален',
        description: 'Пользователь успешно удален из системы',
      });
    },
    onError: (error: Error) => {
      notification.error({
        message: 'Ошибка удаления',
        description: error.message || 'Не удалось удалить пользователя',
      });
    },
  });
};