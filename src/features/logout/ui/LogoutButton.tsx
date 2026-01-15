import React from 'react';
import { Button, Popconfirm } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '@/entities/session/model/useAuth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config';

export const LogoutButton: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <Popconfirm
      title="Выход из системы"
      description="Вы уверены, что хотите выйти?"
      onConfirm={handleLogout}
      okText="Да"
      cancelText="Нет"
    >
      <Button type="text" danger icon={<LogoutOutlined />}>
        Выйти
      </Button>
    </Popconfirm>
  );
};