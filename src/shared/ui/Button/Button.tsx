import React from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';
import styled from 'styled-components';

export interface ButtonProps extends AntButtonProps {
  children: React.ReactNode;
}

const StyledButton = styled(AntButton)`
  border-radius: 6px;
`;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};