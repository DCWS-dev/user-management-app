// src/entities/user/api/useUsers.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notification } from 'antd';
import { usersApi } from '@/shared/api/users';
import { CreateUserDto, UpdateUserDto, User } from '@/shared/api/users/types';

interface GetUsersParams {
  page?: number;
  limit?: number;
}

export const useUsers = (params?: GetUsersParams) => {
  const { page = 1, limit = 10 } = params || {};
  
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: () => usersApi.getUsers({ page, limit }),
    onError: (error: Error) => {
      notification.error({
        message: 'Ошибка загрузки пользователей',
        description: error.message,
      });
    },
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userData: CreateUserDto) => usersApi.createUser(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      notification.success({ message: 'Пользователь успешно создан' });
    },
    onError: (error: Error) => {
      notification.error({
        message: 'Ошибка создания пользователя',
        description: error.message,
      });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, userData }: { id: string; userData: UpdateUserDto }) =>
      usersApi.updateUser(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      notification.success({ message: 'Пользователь успешно обновлен' });
    },
    onError: (error: Error) => {
      notification.error({
        message: 'Ошибка обновления пользователя',
        description: error.message,
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) => usersApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      notification.success({ message: 'Пользователь успешно удален' });
    },
    onError: (error: Error) => {
      notification.error({
        message: 'Ошибка удаления пользователя',
        description: error.message,
      });
    },
  });
};

export const useBulkDeleteUsers = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (ids: string[]) => Promise.all(ids.map(id => usersApi.deleteUser(id))),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      notification.success({ message: 'Пользователи успешно удалены' });
    },
    onError: (error: Error) => {
      notification.error({
        message: 'Ошибка удаления пользователей',
        description: error.message,
      });
    },
  });
};