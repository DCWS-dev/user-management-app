// src/features/create-user/ui/CreateUserModal.tsx
import React from 'react';
import { Modal } from 'antd';
import { CreateUserForm, UserFormValues } from './CreateUserForm';
import { useCreateUser } from '@/entities/user/api/useUsers';
import { CreateUserDto } from '@/shared/api/users/types';

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  onClose,
  onSuccess,
}) => {
  const createUserMutation = useCreateUser();

  const handleSubmit = async (values: UserFormValues) => {
    try {
      const userData: CreateUserDto = {
        ...values,
        company: values.company ? { name: values.company } : undefined,
      };
      
      await createUserMutation.mutateAsync(userData);
      onClose();
      onSuccess?.();
    } catch (error) {
      // Ошибка уже обработана в хуке
    }
  };

  return (
    <Modal
      title="Создать пользователя"
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      destroyOnClose
    >
      <CreateUserForm
        onSubmit={handleSubmit}
        loading={createUserMutation.isLoading}
        onCancel={onClose}
      />
    </Modal>
  );
};