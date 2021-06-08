import React, { useState } from 'react';
import { Form, Input, Select, Button, Result } from 'antd';
import { useHistory } from "react-router-dom";
import axiosInst from '../initAxios.js'
import { EditOutlined, RollbackOutlined, } from '@ant-design/icons';

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUp = () => {
  const [state, setstate] = useState("signup");    
  const [form] = Form.useForm();

  const onFinish = (values) => {
    axiosInst
      .post("/sign/up", {
        nickname: values.nickname,
        mobile: values.phone,
        email: values.email,
        password: values.password,
      })
      .then(() => {
        setstate("success");
      })
    
    // console.log('Received values of form: ', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  
  let history = useHistory();

  const handleClick = () => {
    history.push("/sign/in");
  }


  return (
    (state === "signup") ?
    (    
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        className="register-form"
        initialValues={{
          residence: ['zhejiang', 'hangzhou', 'xihu'],
          prefix: '86',
        }}
        scrollToFirstError
      >

        <Form.Item
          name="nickname"
          label="昵称"
          tooltip="您希望别人怎么称呼您？"
          rules={[
            {
              required: true,
              message: '请输入昵称!',
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="手机号码"
          tooltip="手机号码作为用户名登陆时使用"
          rules={[
            {
              required: true,
              message: '请输入手机号码!',
            },
            {
              // type: 'mobile',
              pattern: /^1[3|4|5|7|8][0-9]\d{8}$/, 
              message: '请输入正确的手机号码!',
            }
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label="邮箱"
          rules={[
            {
              type: 'email',
              message: '请输入正确的邮箱地址!',
            },
            {
              required: true,
              message: '请输入邮箱地址!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: '请输入密码!',
            },
            // {
            //   min: 6,
            //   message: '密码不能少于6位!'
            // },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '请输入确认密码!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不匹配!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" icon={<EditOutlined />} htmlType="submit">
            注册
          </Button>
          <Button type="primary" icon={<RollbackOutlined />} style={{marginLeft: "30px"}} onClick={handleClick}>
            返回
          </Button>
        </Form.Item>
      </Form>
  )
  :
  (
    <Result
      status="success"
      title="注册成功!"
      extra={[
        <Button type="primary" key="console" onClick={handleClick}>
          返回登录
        </Button>
      ]}
    />
  )
  )
};

export default SignUp;