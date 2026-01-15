import React from 'react';
import styled from 'styled-components';
import { LoginForm } from '@/features/auth/ui/LoginForm';
import { useAuth } from '@/entities/session/model/useAuth';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config';
import { Loader } from '@/shared/ui/Loader';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const LoginWrapper = styled.div`
  animation: fadeIn 0.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const LoginPage: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <LoginContainer>
        <Loader />
      </LoginContainer>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.USERS} replace />;
  }

  return (
    <LoginContainer>
      <LoginWrapper>
        <LoginForm />
      </LoginWrapper>
    </LoginContainer>
  );
};