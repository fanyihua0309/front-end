import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  DatePicker,
} from 'antd';

const InputForm = () => {
  const [componentSize, setComponentSize] = useState('default');

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Form.Item label="电影名称">
          <Input />
        </Form.Item>
        <Form.Item label="上映时间">
          <DatePicker />
        </Form.Item>
        <Form.Item label="国家地区">
          <Input />
        </Form.Item>
        <Form.Item label="导演">
          <Input />
        </Form.Item>
        <Form.Item label="主演">
          <Input />
        </Form.Item>
        <Form.Item label="类型">
          <Input />
        </Form.Item>
        <Form.Item label="确定提交">
          <Button type="primary">新建电影</Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default InputForm;