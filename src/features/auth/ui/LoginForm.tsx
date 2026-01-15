import React from 'react';
import { Form, Input, Button, Card, Typography } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useLoginMutation } from '../lib/useLoginMutation';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config';

const { Title } = Typography;

interface LoginFormValues {
  login: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { mutate, isPending } = useLoginMutation();

  const handleSubmit = (values: LoginFormValues) => {
    mutate(values, {
      onSuccess: () => {
        navigate(ROUTES.USERS);
      },
    });
  };

  return (
    <Card style={{ width: 400 }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: 30 }}>
        Вход в систему
      </Title>
      
      <Form<LoginFormValues>
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          login: 'admin',
          password: 'admin',
        }}
      >
        <Form.Item
          name="login"
          label="Логин"
          rules={[
            { required: true, message: 'Пожалуйста, введите логин' },
            { min: 3, message: 'Логин должен содержать минимум 3 символа' },
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Введите логин"
            size="large"
            disabled={isPending}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Пароль"
          rules={[
            { required: true, message: 'Пожалуйста, введите пароль' },
            { min: 3, message: 'Пароль должен содержать минимум 3 символа' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Введите пароль"
            size="large"
            disabled={isPending}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 10 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isPending}
            disabled={isPending}
            block
          >
            {isPending ? 'Вход...' : 'Войти'}
          </Button>
        </Form.Item>

        <div style={{ textAlign: 'center', color: '#666', fontSize: 12 }}>
          <p>Используйте для входа:</p>
          <p><strong>Логин:</strong> admin | <strong>Пароль:</strong> admin</p>
        </div>
      </Form>
    </Card>
  );
};