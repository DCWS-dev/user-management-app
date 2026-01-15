import React from 'react';
import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';

const { Header, Content, Footer } = AntLayout;

const StyledLayout = styled(AntLayout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  padding: 0 24px;
`;

const StyledContent = styled(Content)`
  padding: 24px;
  background: #fff;
`;

const StyledFooter = styled(Footer)`
  text-align: center;
  background: #f0f2f5;
`;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <StyledLayout>
      <StyledHeader>
        <h2 style={{ margin: 0 }}>User Management</h2>
      </StyledHeader>
      <StyledContent>{children}</StyledContent>
      <StyledFooter>
        User Management App ©{new Date().getFullYear()}
      </StyledFooter>
    </StyledLayout>
  );
};