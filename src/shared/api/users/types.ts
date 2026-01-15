// src/shared/api/users/types.ts
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  company?: {
    name: string;
  };
  createdAt: string;
}

export type CreateUserDto = Omit<User, 'id' | 'createdAt'>;
export type UpdateUserDto = Partial<Omit<User, 'id' | 'createdAt'>>;