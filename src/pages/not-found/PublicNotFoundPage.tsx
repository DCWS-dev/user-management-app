import React from 'react';
import { Result, Button } from 'antd';
import { LoginOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '@/shared/config';

const PublicContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const PublicContent = styled.div`
  background: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 500px;
`;

export const PublicNotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PublicContainer>
      <PublicContent>
        <Result
          status="404"
          title="404"
          subTitle="Страница не найдена"
          extra={
            <Button
              type="primary"
              icon={<LoginOutlined />}
              onClick={() => navigate(ROUTES.LOGIN)}
              size="large"
            >
              Войти в систему
            </Button>
          }
        />
        <p style={{ color: '#666', marginTop: 20 }}>
          Возможно, у вас нет доступа к этой странице. Попробуйте войти в систему.
        </p>
      </PublicContent>
    </PublicContainer>
  );
};