import React from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';
import styled from 'styled-components';

export interface InputProps extends AntInputProps {}

const StyledInput = styled(AntInput)`
  border-radius: 6px;
  
  &:focus {
    border-color: #1890ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }
`;

export const Input: React.FC<InputProps> = (props) => {
  return <StyledInput {...props} />;
};