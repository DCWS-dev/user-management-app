import type { UploadFile, RcFile } from 'antd/es/upload';

export const beforeUpload = (file: RcFile): boolean => {
  const isImage = file.type.startsWith('image/');
  if (!isImage) {
    console.error('Можно загружать только изображения!');
  }

  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    console.error('Изображение должно быть меньше 2MB!');
  }

  return isImage && isLt2M;
};

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });