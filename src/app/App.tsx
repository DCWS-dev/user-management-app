import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { Layout } from '@/shared/ui/Layout';
import { LoginPage } from '@/pages/login';
import { UsersPage } from '@/pages/users';
import { NotFoundPage, PublicNotFoundPage } from '@/pages/not-found';
import { RequireAuth } from './providers/RequireAuth';
import { ROUTES } from '@/shared/config';
import { useAuth } from '@/entities/session/model/useAuth';

const NotFoundWrapper: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return (
      <Layout>
        <NotFoundPage />
      </Layout>
    );
  }
  
  return <PublicNotFoundPage />;
};

export const App: React.FC = () => {
  return (
    <AppProviders>
      <Routes>
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route
          path={ROUTES.USERS}
          element={
            <RequireAuth>
              <Layout>
                <UsersPage />
              </Layout>
            </RequireAuth>
          }
        />
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundWrapper />} />
      </Routes>
    </AppProviders>
  );
};