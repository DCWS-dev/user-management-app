// src/features/edit-user/ui/EditUserModal.tsx
import React, { useEffect } from 'react';
import { Modal } from 'antd';
import { User } from '@/shared/api/users/types';
import { UpdateUserDto } from '@/shared/api/users/types';
import { CreateUserForm, UserFormValues } from '@/features/create-user/ui/CreateUserForm';
import { useUpdateUser } from '@/entities/user/api/useUsers';

interface EditUserModalProps {
  user: User;
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  mode?: 'edit' | 'view';
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  open,
  onClose,
  onSuccess,
  mode = 'edit',
}) => {
  const updateUserMutation = useUpdateUser();

  const handleSubmit = async (values: UserFormValues) => {
    try {
      const userData: UpdateUserDto = {
        ...values,
        company: values.company ? { name: values.company } : undefined,
      };
      
      await updateUserMutation.mutateAsync({
        id: user.id,
        userData,
      });
      onClose();
      onSuccess?.();
    } catch (error) {
      // Ошибка уже обработана в хуке
    }
  };

  const isViewMode = mode === 'view';
  const title = isViewMode ? 'Просмотр пользователя' : 'Редактировать пользователя';

  const initialValues: UserFormValues = {
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    avatar: user.avatar || '',
    company: user.company?.name || '',
  };

  return (
    <Modal
      title={title}
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      destroyOnClose
    >
      <CreateUserForm
        onSubmit={handleSubmit}
        loading={updateUserMutation.isLoading}
        onCancel={onClose}
        disabled={isViewMode}
        initialValues={initialValues}
      />
    </Modal>
  );
};