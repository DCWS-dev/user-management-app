import React from 'react';
import { Result as AntResult, ResultProps } from 'antd';
import styled from 'styled-components';

const StyledResult = styled(AntResult)`
  .ant-result-icon {
    margin-bottom: 24px;
  }

  .ant-result-title {
    font-size: 24px;
    font-weight: 600;
    color: #262626;
  }

  .ant-result-subtitle {
    font-size: 16px;
    color: #8c8c8c;
  }
`;

interface CustomResultProps extends ResultProps {
  children?: React.ReactNode;
}

export const CustomResult: React.FC<CustomResultProps> = ({ 
  children, 
  ...props 
}) => {
  return (
    <StyledResult {...props}>
      {children}
    </StyledResult>
  );
};