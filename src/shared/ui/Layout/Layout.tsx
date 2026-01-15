import React from 'react';
import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';
import { LogoutButton } from '@/features/logout/ui/LogoutButton';

const { Header, Content, Footer } = AntLayout;

const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 24px;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const StyledContent = styled(Content)`
  padding: 24px;
  background: #fff;
  margin: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 112px);
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  background: #f0f2f5;
  padding: 16px 0;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <StyledHeader>
        <HeaderTitle>User Management</HeaderTitle>
        <LogoutButton />
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
      <StyledFooter>
        User Management App ©{new Date().getFullYear()}
      </StyledFooter>
    </StyledLayout>
  );
};