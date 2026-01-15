import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/entities/session/model/useAuth';
import { ROUTES } from '@/shared/config';
import { Loader } from '@/shared/ui/Loader';

interface RequireAuthProps {
  children: React.ReactNode;
}

export const RequireAuth: React.FC<RequireAuthProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return <>{children}</>;
};