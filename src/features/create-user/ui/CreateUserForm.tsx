import React, { useState } from 'react';
import { Form, Input, Button, Upload, Row, Col, Space } from 'antd';
import { 
  UploadOutlined, 
  UserOutlined, 
  MailOutlined, 
  PhoneOutlined, 
  GlobalOutlined, 
  BuildOutlined 
} from '@ant-design/icons';
import type { UploadFile, UploadProps } from 'antd';
import { CreateUserDto } from '@/shared/api/users';
import { beforeUpload, getBase64 } from '../lib/image-utils';

interface CreateUserFormProps {
  onSubmit: (values: CreateUserDto) => void;
  isPending: boolean;
}

export const CreateUserForm: React.FC<CreateUserFormProps> = ({
  onSubmit,
  isPending,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [previewImage, setPreviewImage] = useState<string>('');

  const handleUploadChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview && file.originFileObj) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || (file.preview as string));
  };

  const handleSubmit = (values: CreateUserDto) => {
    // Если есть загруженное изображение, добавляем его в данные
    if (fileList.length > 0 && fileList[0].originFileObj) {
      values.avatar = URL.createObjectURL(fileList[0].originFileObj);
    }
    onSubmit(values);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <Form<CreateUserDto>
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      disabled={isPending}
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="name"
            label="Имя"
            rules={[
              { required: true, message: 'Пожалуйста, введите имя' },
              { min: 2, message: 'Имя должно содержать минимум 2 символа' },
              { max: 50, message: 'Имя не должно превышать 50 символов' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Введите имя"
              size="large"
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
                message: 'Введите корректный номер телефона' 
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined />}
              placeholder="+7 (999) 999-99-99"
              size="large"
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
                message: 'Введите корректный URL (начинается с http:// или https://)' 
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
                style={{ width: '70%' }}
              />
            </Space.Compact>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        name="company"
        label="Компания"
        rules={[
          { max: 100, message: 'Название компании не должно превышать 100 символов' },
        ]}
      >
        <Input
          prefix={<BuildOutlined />}
          placeholder="Введите название компании"
          size="large"
        />
      </Form.Item>

      <Form.Item
        name="avatar"
        label="Аватар"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          listType="picture-card"
          fileList={fileList}
          onChange={handleUploadChange}
          onPreview={handlePreview}
          beforeUpload={beforeUpload}
          maxCount={1}
          accept="image/*"
        >
          {fileList.length < 1 && (
            <div>
              <UploadOutlined />
              <div style={{ marginTop: 8 }}>Загрузить</div>
            </div>
          )}
        </Upload>
      </Form.Item>

      {previewImage && (
        <img
          src={previewImage}
          alt="Preview"
          style={{ width: '100%', maxHeight: 200, objectFit: 'contain', marginBottom: 16 }}
        />
      )}

      <Form.Item style={{ marginTop: 24, marginBottom: 0 }}>
        <Button
          type="primary"
          htmlType="submit"
          loading={isPending}
          disabled={isPending}
          size="large"
          block
        >
          {isPending ? 'Создание...' : 'Создать пользователя'}
        </Button>
      </Form.Item>
    </Form>
  );
};