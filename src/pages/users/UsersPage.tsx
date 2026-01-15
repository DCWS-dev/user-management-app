import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

export const UsersPage: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <Title level={2}>Пользователи</Title>
      <p>Страница списка пользователей будет реализована на следующем этапе</p>
    </div>
  );
};