import { api } from './instance';

export interface User {
  id: string;
  createdAt: string;
  name: string;
  avatar?: string;
  email: string;
  phone?: string;
  website?: string;
  company?: {
    name: string;
  };
}

export type CreateUserDto = {
  name: string;
  email: string;
  phone?: string;
  website?: string;
  avatar?: string;
  company?: string;
};

export type UpdateUserDto = Partial<Omit<User, 'id' | 'createdAt'>> & {
  company?: string;
};

export const usersApi = {
  getUsers: async (p0: { page: number; limit: number; }): Promise<User[]> => {
    const { data } = await api.get<User[]>('/users');
    return data;
  },

  getUser: async (id: string): Promise<User> => {
    const { data } = await api.get<User>(`/users/${id}`);
    return data;
  },

  createUser: async (userData: CreateUserDto): Promise<User> => {
    const dataToSend = userData.company 
      ? { ...userData, company: { name: userData.company } }
      : userData;
    
    const { data } = await api.post<User>('/users', dataToSend);
    return data;
  },

  updateUser: async (id: string, userData: UpdateUserDto): Promise<User> => {
    const dataToSend = userData.company 
      ? { ...userData, company: { name: userData.company } }
      : userData;
    
    const { data } = await api.put<User>(`/users/${id}`, dataToSend);
    return data;
  },

  deleteUser: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};