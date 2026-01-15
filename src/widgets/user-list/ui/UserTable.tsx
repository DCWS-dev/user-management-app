import React, { useState } from 'react';
import { Table, Button, Space, Avatar, Tag, Popconfirm, Typography } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserAddOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
import { User } from '@/shared/api/users';
import { dayjs } from '@/shared/lib/dayjs';
import styled from 'styled-components';

const { Text } = Typography;

const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background: #fafafa;
    font-weight: 600;
  }

  .ant-table-tbody > tr:hover {
    background: #fafafa;
    cursor: pointer;
  }
`;

const UserAvatar = styled(Avatar)`
  background: #1890ff;
`;

const ActionsCell = styled.div`
  display: flex;
  gap: 8px;
`;

interface UserTableProps {
  users: User[];
  loading: boolean;
  onEdit: (user: User) => void;
  onView: (user: User) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
  onCreate: () => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading,
  onEdit,
  onView,
  onDelete,
  onRefresh,
  onCreate,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const columns = [
    {
      title: 'Аватар',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      render: (avatar: string, record: User) => (
        <div onClick={() => onView(record)} style={{ cursor: 'pointer' }}>
          {avatar ? (
            <Avatar src={avatar} size="large" />
          ) : (
            <UserAvatar size="large">
              {record.name.charAt(0).toUpperCase()}
            </UserAvatar>
          )}
        </div>
      ),
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
      render: (name: string, record: User) => (
        <div onClick={() => onView(record)} style={{ cursor: 'pointer' }}>
          <Text strong>{name}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: 12 }}>
            ID: {record.id}
          </Text>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => (
        <a href={`mailto:${email}`}>{email}</a>
      ),
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone: string) => phone || <Text type="secondary">Не указан</Text>,
    },
    {
      title: 'Зарегистрирован',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: User, b: User) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      render: (date: string) => (
        <Tag color="blue">{dayjs(date).format('DD.MM.YYYY')}</Tag>
      ),
    },
    {
      title: 'Компания',
      dataIndex: 'company',
      key: 'company',
      render: (company: { name: string }) =>
        company?.name || <Text type="secondary">Не указана</Text>,
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 150,
      render: (_: any, record: User) => (
        <ActionsCell>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => onView(record)}
            title="Просмотр"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => onEdit(record)}
            title="Редактировать"
          />
          <Popconfirm
            title="Удалить пользователя"
            description="Вы уверены, что хотите удалить этого пользователя?"
            onConfirm={() => onDelete(record.id)}
            okText="Да"
            cancelText="Нет"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              title="Удалить"
            />
          </Popconfirm>
        </ActionsCell>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => setSelectedRowKeys(keys),
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={onCreate}
        >
          Создать пользователя
        </Button>
        <Button
          icon={<ReloadOutlined />}
          onClick={onRefresh}
          loading={loading}
        >
          Обновить
        </Button>
        {selectedRowKeys.length > 0 && (
          <Popconfirm
            title="Удалить выбранных пользователей"
            description={`Вы уверены, что хотите удалить ${selectedRowKeys.length} пользователей?`}
            onConfirm={() => {
              selectedRowKeys.forEach((key) => onDelete(key.toString()));
              setSelectedRowKeys([]);
            }}
            okText="Да"
            cancelText="Нет"
          >
            <Button danger icon={<DeleteOutlined />}>
              Удалить выбранные ({selectedRowKeys.length})
            </Button>
          </Popconfirm>
        )}
      </Space>

      <StyledTable
        rowKey="id"
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} из ${total} пользователей`,
          showQuickJumper: true,
        }}
        rowSelection={rowSelection}
        scroll={{ x: 1200 }}
      />
    </div>
  );
};