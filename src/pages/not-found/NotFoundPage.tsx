import React from 'react';
import { Result, Button, Space, Typography } from 'antd';
import { HomeOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '@/shared/config';

const { Text } = Typography;

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
`;

const ContentWrapper = styled.div`
  text-align: center;
  max-width: 500px;
  animation: fadeIn 0.6s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const CustomResult = styled(Result)`
  .ant-result-icon {
    margin-bottom: 0;
  }

  .ant-result-title {
    font-size: 64px;
    font-weight: 700;
    color: #1890ff;
    margin-bottom: 8px;
  }

  .ant-result-subtitle {
    font-size: 18px;
    color: #666;
    margin-bottom: 32px;
  }
`;

const ErrorDetails = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
`;

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoHome = () => {
    navigate(ROUTES.USERS);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <NotFoundContainer>
      <ContentWrapper>
        <CustomResult
          status="404"
          title="404"
          subTitle="Извините, страница, которую вы посетили, не существует."
        />

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space>
            <Button
              type="primary"
              size="large"
              icon={<HomeOutlined />}
              onClick={handleGoHome}
            >
              На главную
            </Button>
            <Button
              size="large"
              icon={<ArrowLeftOutlined />}
              onClick={handleGoBack}
            >
              Назад
            </Button>
          </Space>

          <ErrorDetails>
            <Text type="secondary">
              <strong>Запрошенный URL:</strong> {location.pathname}
            </Text>
            <br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Если вы считаете, что это ошибка, пожалуйста, свяжитесь с администратором.
            </Text>
          </ErrorDetails>

          <div style={{ marginTop: 16 }}>
            <Text type="secondary">
              Попробуйте проверить URL или использовать навигационное меню для перехода к доступным страницам.
            </Text>
          </div>
        </Space>
      </ContentWrapper>
    </NotFoundContainer>
  );
};