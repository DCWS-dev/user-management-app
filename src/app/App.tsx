import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppProviders } from './providers/AppProviders';
import { Layout } from '@/shared/ui/Layout';
import { LoginPage } from '@/pages/login';
import { UsersPage } from '@/pages/users';
import { NotFoundPage } from '@/pages/not-found';

// Временная заглушка для проверки авторизации
// На следующем этапе заменим на реальную логику
const isAuthenticated = false;

export const App: React.FC = () => {
  return (
    <AppProviders>
      <Routes>
        {/* Редирект с корня на страницу входа */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Страница входа */}
        <Route 
          path="/login" 
          element={
            isAuthenticated ? (
              <Navigate to="/users" replace />
            ) : (
              <LoginPage />
            )
          } 
        />
        
        {/* Защищенные маршруты */}
        <Route 
          path="/users" 
          element={
            isAuthenticated ? (
              <Layout>
                <UsersPage />
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          } 
        />
        
        {/* Страница 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppProviders>
  );
};