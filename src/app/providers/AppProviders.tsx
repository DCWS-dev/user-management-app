import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { handleApiError } from '@/shared/api/error-handler';

interface AppProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 минут
      onError: handleApiError,
    },
    mutations: {
      onError: handleApiError,
    },
  },
});

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider
          locale={ruRU}
          theme={{
            token: {
              colorPrimary: '#1890ff',
              borderRadius: 6,
              colorBgContainer: '#ffffff',
            },
            components: {
              Result: {
                titleFontSize: 24,
              },
            },
          }}
        >
          {children}
        </ConfigProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};