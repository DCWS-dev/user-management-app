// src/shared/ui/Result/CustomResult.tsx
import React from 'react';
import { Result, ResultProps } from 'antd';

export const CustomResult: React.FC<ResultProps> = (props) => {
  return <Result {...props} />;
};

export default CustomResult;