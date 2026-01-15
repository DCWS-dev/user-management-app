import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usersAPI, User, CreateUserDto, UpdateUserDto } from '@/shared/api/users';

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

  return useMutation({
    mutationFn: usersAPI.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
    onError: (error: Error) => {
      console.error('Ошибка создания пользователя:', error);
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserDto }) =>
      usersAPI.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
    onError: (error: Error) => {
      console.error('Ошибка обновления пользователя:', error);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersAPI.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: USERS_QUERY_KEY });
    },
    onError: (error: Error) => {
      console.error('Ошибка удаления пользователя:', error);
    },
  });
};