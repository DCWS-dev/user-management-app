import React, { useState } from 'react';
import { Typography, Space, Card, Row, Col, Statistic } from 'antd';
import {
  TeamOutlined,
  UserAddOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';
import { UserTable } from '@/widgets/user-list/ui/UserTable';
import { useUsers, useDeleteUser } from '@/entities/user/api/useUsers';
import { User } from '@/shared/api/users';
import { dayjs } from '@/shared/lib/dayjs';
import { Loader } from '@/shared/ui/Loader';
import styled from 'styled-components';

const { Title } = Typography;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const StatsCard = styled(Card)`
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .ant-card-body {
    padding: 20px;
  }
`;

export const UsersPage: React.FC = () => {
  const { data: users = [], isLoading, refetch } = useUsers();
  const deleteUser = useDeleteUser();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditModalOpen(true);
  };

  const handleView = (user: User) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteUser.mutate(id);
  };

  const handleRefresh = () => {
    refetch();
  };

  // Статистика
  const totalUsers = users.length;
  const newUsersLastWeek = users.filter(user =>
    dayjs(user.createdAt).isAfter(dayjs().subtract(7, 'day'))
  ).length;
  const averageRegistration = users.length > 0
    ? dayjs(users[0].createdAt).fromNow(true)
    : 'Нет данных';

  if (isLoading && users.length === 0) {
    return <Loader tip="Загрузка пользователей..." />;
  }

  return (
    <div>
      <PageHeader>
        <Title level={2}>Управление пользователями</Title>
        <Typography.Paragraph type="secondary">
          Всего пользователей в системе: {totalUsers}
        </Typography.Paragraph>
      </PageHeader>

      {/* Статистика */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={8}>
          <StatsCard>
            <Statistic
              title="Всего пользователей"
              value={totalUsers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={8}>
          <StatsCard>
            <Statistic
              title="Новых за неделю"
              value={newUsersLastWeek}
              prefix={<UserAddOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </StatsCard>
        </Col>
        <Col xs={24} sm={8}>
          <StatsCard>
            <Statistic
              title="Среднее время в системе"
              value={averageRegistration}
              prefix={<ClockCircleOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </StatsCard>
        </Col>
      </Row>

      {/* Таблица пользователей */}
      <Card>
        <UserTable
          users={users}
          loading={isLoading}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
          onRefresh={handleRefresh}
          onCreate={() => {/* Пока заглушка для создания */}}
        />
      </Card>
    </div>
  );
};