import React from 'react';
import { Empty as AntEmpty, EmptyProps } from 'antd';

export const Empty: React.FC<EmptyProps> = (props) => {
  return <AntEmpty {...props} />;
};

export default Empty;