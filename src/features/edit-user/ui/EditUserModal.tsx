import React, { useEffect } from 'react';
import { Modal, Form, Input, Button, Avatar, Row, Col, Space } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  BuildOutlined,
} from '@ant-design/icons';
import { User, UpdateUserDto } from '@/shared/api/users';
import { dayjs } from '@/shared/lib/dayjs';
import { useUpdateUser } from '@/entities/user/api/useUsers';

interface EditUserModalProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
  mode?: 'edit' | 'view';
}

export const EditUserModal: React.FC<EditUserModalProps> = ({
  user,
  open,
  onClose,
  mode = 'edit',
}) => {
  const [form] = Form.useForm();
  const updateUser = useUpdateUser();

  useEffect(() => {
    if (user && open) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        website: user.website || '',
        company: user.company?.name || '',
      });
    }
  }, [user, open, form]);

  const handleSubmit = (values: UpdateUserDto) => {
    if (user) {
      updateUser.mutate(
        { id: user.id, data: values },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  const handleCancel = () => {
    if (!updateUser.isPending) {
      onClose();
    }
  };

  if (!user) return null;

  return (
    <Modal
      title={mode === 'edit' ? 'Редактирование пользователя' : 'Просмотр пользователя'}
      open={open}
      onCancel={handleCancel}
      footer={
        mode === 'edit' ? (
          <>
            <Button onClick={handleCancel} disabled={updateUser.isPending}>
              Отмена
            </Button>
            <Button
              type="primary"
              onClick={() => form.submit()}
              loading={updateUser.isPending}
              disabled={updateUser.isPending}
            >
              Сохранить
            </Button>
          </>
        ) : null
      }
      width={600}
      closable={!updateUser.isPending}
      maskClosable={!updateUser.isPending}
      destroyOnClose
    >
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        {user.avatar ? (
          <Avatar src={user.avatar} size={100} />
        ) : (
          <Avatar icon={<UserOutlined />} size={100} />
        )}
        <div style={{ marginTop: 8 }}>
          <strong>ID: </strong>
          <span style={{ fontFamily: 'monospace' }}>{user.id}</span>
        </div>
        <div style={{ marginTop: 4, color: '#666' }}>
          Зарегистрирован: {dayjs(user.createdAt).format('DD.MM.YYYY HH:mm')}
        </div>
      </div>

      <Form<UpdateUserDto>
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        disabled={mode === 'view' || updateUser.isPending}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="name"
              label="Имя"
              rules={[
                { required: true, message: 'Пожалуйста, введите имя' },
                { min: 2, message: 'Имя должно содержать минимум 2 символа' },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Введите имя"
                size="large"
                readOnly={mode === 'view'}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Пожалуйста, введите email' },
                { type: 'email', message: 'Введите корректный email адрес' },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Введите email"
                size="large"
                readOnly={mode === 'view'}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              name="phone"
              label="Телефон"
              rules={[
                {
                  pattern: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
                  message: 'Введите корректный номер телефона',
                },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="+7 (999) 999-99-99"
                size="large"
                readOnly={mode === 'view'}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              name="website"
              label="Вебсайт"
              rules={[
                {
                  type: 'url',
                  message: 'Введите корректный URL (начинается с http:// или https://)',
                },
              ]}
            >
              <Space.Compact block style={{ width: '100%' }}>
                <Input
                  style={{ width: '30%' }}
                  value="https://"
                  disabled
                  size="large"
                />
                <Input
                  prefix={<GlobalOutlined />}
                  placeholder="example.com"
                  size="large"
                  readOnly={mode === 'view'}
                  style={{ width: '70%' }}
                />
              </Space.Compact>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="company"
          label="Компания"
        >
          <Input
            prefix={<BuildOutlined />}
            placeholder="Введите название компании"
            size="large"
            readOnly={mode === 'view'}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};