import React, { useState } from 'react';
import { Table, Button, Space, Image, Tag, Popconfirm, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { User } from '@/shared/api/users/types';

interface UserTableProps {
  users: User[];
  loading?: boolean;
  onEditUser?: (user: User) => void;
  onViewUser?: (user: User) => void;
  onDeleteUser?: (id: string) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  loading = false,
  onEditUser,
  onViewUser,
  onDeleteUser,
  onSelectionChange,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const handleDelete = (id: string) => {
    if (onDeleteUser) {
      onDeleteUser(id);
      message.success('Пользователь удален');
    }
  };

  const handleSelectionChange = (selectedKeys: React.Key[]) => {
    setSelectedRowKeys(selectedKeys);
    if (onSelectionChange) {
      onSelectionChange(selectedKeys.map(key => key.toString()));
    }
  };

  const columns: ColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      render: (id: string) => <Tag color="blue">{id.slice(0, 8)}...</Tag>,
    },
    {
      title: 'Аватар',
      dataIndex: 'avatar',
      key: 'avatar',
      width: 80,
      render: (avatarUrl: string, record: User) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Image
            src={avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(record.name)}&background=random`}
            alt={record.name}
            width={40}
            height={40}
            style={{ borderRadius: '50%', objectFit: 'cover' }}
            preview={avatarUrl ? {
              src: avatarUrl,
              mask: <EyeOutlined style={{ fontSize: 16 }} />,
            } : false}
          />
        </div>
      ),
    },
    {
      title: 'Имя',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: User, b: User) => a.name.localeCompare(b.name),
      render: (name: string) => <strong>{name}</strong>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email: string) => <a href={`mailto:${email}`}>{email}</a>,
    },
    {
      title: 'Телефон',
      dataIndex: 'phone',
      key: 'phone',
      render: (phone?: string) => phone || <span style={{ color: '#999' }}>Не указан</span>,
    },
    {
      title: 'Компания',
      dataIndex: 'company',
      key: 'company',
      render: (company?: { name: string }) => company?.name || <span style={{ color: '#999' }}>Не указана</span>,
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a: User, b: User) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      render: (createdAt: string) => dayjs(createdAt).format('DD.MM.YYYY HH:mm'),
    },
    {
      title: 'Действия',
      key: 'actions',
      width: 200,
      render: (_: any, record: User) => (
        <Space size="small">
          {onViewUser && (
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => onViewUser(record)}
              title="Просмотр"
            />
          )}
          {onEditUser && (
            <Button
              type="text"
              size="small"
              icon={<EditOutlined />}
              onClick={() => onEditUser(record)}
              title="Редактировать"
            />
          )}
          {onDeleteUser && (
            <Popconfirm
              title="Удалить пользователя?"
              description="Вы уверены, что хотите удалить этого пользователя?"
              onConfirm={() => handleDelete(record.id)}
              okText="Да"
              cancelText="Нет"
            >
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                title="Удалить"
              />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const rowSelection = onSelectionChange
    ? {
        selectedRowKeys,
        onChange: handleSelectionChange,
        selections: [
          Table.SELECTION_ALL,
          Table.SELECTION_INVERT,
          Table.SELECTION_NONE,
        ],
      }
    : undefined;

  return (
    <Table<User>
      columns={columns}
      dataSource={users.map(user => ({ ...user, key: user.id }))}
      loading={loading}
      rowSelection={rowSelection}
      pagination={{
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `${range[0]}-${range[1]} из ${total} пользователей`,
      }}
      scroll={{ x: 1200 }}
      locale={{
        emptyText: 'Нет данных о пользователях',
      }}
    />
  );
};

export default UserTable;