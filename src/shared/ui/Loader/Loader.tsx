import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

const FullScreenLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

interface LoaderProps {
  size?: 'small' | 'default' | 'large';
  tip?: string;
  fullscreen?: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = 'default', 
  tip,
  fullscreen = false,
}) => {
  if (fullscreen) {
    return (
      <FullScreenLoader>
        <Spin size={size} tip={tip} fullscreen />
      </FullScreenLoader>
    );
  }

  return (
    <LoaderContainer>
      <Spin size={size} />
      {tip && <div style={{ marginTop: 8 }}>{tip}</div>}
    </LoaderContainer>
  );
};