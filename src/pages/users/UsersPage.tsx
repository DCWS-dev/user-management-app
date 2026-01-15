// src/pages/users/UsersPage.tsx
import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography, Space, notification } from 'antd';
import { PlusOutlined, ReloadOutlined, DeleteOutlined } from '@ant-design/icons';
import { useUsers, useDeleteUser, useBulkDeleteUsers } from '@/entities/user/api/useUsers';
import { UserTable } from '@/widgets/user-list/ui/UserTable';
import { CreateUserModal } from '@/features/create-user/ui/CreateUserModal';
import { EditUserModal } from '@/features/edit-user/ui/EditUserModal';
import { User } from '@/shared/api/users/types';
import { useAuth } from '@/entities/session/model/useAuth';

const { Title } = Typography;

export const UsersPage: React.FC = () => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  
  const { data: usersData, isLoading, refetch } = useUsers();
  const deleteUserMutation = useDeleteUser();
  const bulkDeleteMutation = useBulkDeleteUsers();
  const { logout } = useAuth();

  const users = usersData || [];

  const handleCreateUser = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleViewUser = (user: User) => {
    setViewingUser(user);
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await deleteUserMutation.mutateAsync(id);
      notification.success({ message: 'Пользователь удален' });
    } catch (error) {
      notification.error({ message: 'Ошибка удаления пользователя' });
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUserIds.length === 0) {
      notification.warning({ message: 'Выберите пользователей для удаления' });
      return;
    }

    try {
      await bulkDeleteMutation.mutateAsync(selectedUserIds);
      setSelectedUserIds([]);
      notification.success({ message: 'Пользователи удалены' });
    } catch (error) {
      notification.error({ message: 'Ошибка удаления пользователей' });
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  const handleCreateModalClose = () => {
    setIsCreateModalOpen(false);
  };

  const handleEditModalClose = () => {
    setEditingUser(null);
  };

  const handleViewModalClose = () => {
    setViewingUser(null);
  };

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedUserIds(selectedIds);
  };

  return (
    <div>
      <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
        <Col>
          <Title level={2}>Пользователи</Title>
          <Typography.Text type="secondary">
            Всего пользователей: {users.length}
          </Typography.Text>
        </Col>
        <Col>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleCreateUser}
            >
              Создать пользователя
            </Button>
            <Button
              icon={<ReloadOutlined />}
              onClick={handleRefresh}
              loading={isLoading}
            >
              Обновить
            </Button>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={handleBulkDelete}
              disabled={selectedUserIds.length === 0}
              loading={bulkDeleteMutation.isLoading}
            >
              Удалить выбранных ({selectedUserIds.length})
            </Button>
          </Space>
        </Col>
      </Row>

      <Card>
        <UserTable
          users={users}
          loading={isLoading}
          onEditUser={handleEditUser}
          onViewUser={handleViewUser}
          onDeleteUser={handleDeleteUser}
          onSelectionChange={handleSelectionChange}
        />
      </Card>

      <CreateUserModal
        open={isCreateModalOpen}
        onClose={handleCreateModalClose}
        onSuccess={() => {
          handleCreateModalClose();
          refetch();
        }}
      />

      {editingUser && (
        <EditUserModal
          user={editingUser}
          open={!!editingUser}
          onClose={handleEditModalClose}
          onSuccess={() => {
            handleEditModalClose();
            refetch();
          }}
        />
      )}

      {viewingUser && (
        <EditUserModal
          user={viewingUser}
          open={!!viewingUser}
          onClose={handleViewModalClose}
          mode="view"
        />
      )}
    </div>
  );
};