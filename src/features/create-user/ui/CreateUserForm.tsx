// src/features/create-user/ui/CreateUserForm.tsx
import React from 'react';
import { Form, Input, Button, Space, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd';
import { CreateUserDto } from '@/shared/api/users/types';

// Экспортируемый тип для значений формы
export type UserFormValues = {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  company: string;
};

// Пропсы компонента формы
export interface CreateUserFormProps {
  onSubmit: (values: UserFormValues) => void | Promise<void>;
  loading?: boolean;
  onCancel?: () => void;
  disabled?: boolean;
  initialValues?: Partial<UserFormValues>;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({
  onSubmit,
  loading = false,
  onCancel,
  disabled = false,
  initialValues,
}) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: UserFormValues) => {
    try {
      await onSubmit(values);
      form.resetFields();
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={initialValues}
      disabled={disabled}
    >
      <Form.Item
        label="Имя"
        name="name"
        rules={[
          { required: true, message: 'Введите имя пользователя' },
          { min: 2, message: 'Имя должно содержать минимум 2 символа' },
        ]}
      >
        <Input placeholder="Введите имя" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Введите email' },
          { type: 'email', message: 'Введите корректный email' },
        ]}
      >
        <Input placeholder="Введите email" />
      </Form.Item>

      <Form.Item
        label="Телефон"
        name="phone"
        rules={[
          { required: true, message: 'Введите телефон' },
          { pattern: /^\+?[1-9]\d{1,14}$/, message: 'Введите корректный номер телефона' },
        ]}
      >
        <Input placeholder="+79991234567" />
      </Form.Item>

      <Form.Item
        label="Аватар (URL)"
        name="avatar"
        rules={[
          { required: true, message: 'Введите URL аватара' },
          { type: 'url', message: 'Введите корректный URL' },
        ]}
      >
        <Input placeholder="https://example.com/avatar.jpg" />
      </Form.Item>

      <Form.Item
        label="Компания"
        name="company"
        rules={[{ required: true, message: 'Введите название компании' }]}
      >
        <Input placeholder="Введите название компании" />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading} disabled={disabled}>
            {disabled ? 'Просмотр' : 'Сохранить'}
          </Button>
          {onCancel && (
            <Button onClick={onCancel} disabled={loading}>
              Отмена
            </Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};

export { CreateUserForm };