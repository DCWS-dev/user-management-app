import React from 'react';
import { Modal } from 'antd';
import { CreateUserForm } from './CreateUserForm';
import { useCreateUser } from '@/entities/user/api/useUsers';
import { CreateUserDto } from '@/shared/api/users';

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

export const CreateUserModal: React.FC<CreateUserModalProps> = ({
  open,
  onClose,
}) => {
  const createUser = useCreateUser();

  const handleSubmit = (values: CreateUserDto) => {
    createUser.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const handleCancel = () => {
    if (!createUser.isPending) {
      onClose();
    }
  };

  return (
    <Modal
      title="Создание пользователя"
      open={open}
      onCancel={handleCancel}
      footer={null}
      width={700}
      closable={!createUser.isPending}
      maskClosable={!createUser.isPending}
      destroyOnClose
    >
      <CreateUserForm
        onSubmit={handleSubmit}
        isPending={createUser.isPending}
      />
    </Modal>
  );
};