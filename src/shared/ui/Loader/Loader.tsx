import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

interface LoaderProps {
  size?: 'small' | 'default' | 'large';
  tip?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = 'default', 
  tip = 'Загрузка...' 
}) => {
  return (
    <LoaderContainer>
      <Spin size={size} tip={tip} />
    </LoaderContainer>
  );
};