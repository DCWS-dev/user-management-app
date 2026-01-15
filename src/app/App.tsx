import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { Layout } from '@/shared/ui/Layout';
import { LoginPage } from '@/pages/login';
import { UsersPage } from '@/pages/users';
import { NotFoundPage } from '@/pages/not-found';
import { RequireAuth } from './providers/RequireAuth';
import { ROUTES } from '@/shared/config';

export const App: React.FC = () => {
  return (
    <AppProviders>
      <Routes>
        {/* Редирект с корня */}
        <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />
        
        {/* Публичный маршрут - логин */}
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        
        {/* Защищенные маршруты */}
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
        
        {/* Страница 404 */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
      </Routes>
    </AppProviders>
  );
};