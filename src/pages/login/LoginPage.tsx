import React from 'react';
import { Card, Typography } from 'antd';

const { Title } = Typography;

export const LoginPage: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      background: '#f0f2f5'
    }}>
      <Card style={{ width: 400 }}>
        <Title level={2} style={{ textAlign: 'center' }}>Вход</Title>
        <p style={{ textAlign: 'center', color: '#666' }}>
          Страница авторизации будет реализована на следующем этапе
        </p>
      </Card>
    </div>
  );
};