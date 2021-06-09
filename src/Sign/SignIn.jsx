import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import axiosInst from '../initAxios.js';


const SignIn = ({ identity }) => {

  let history = useHistory();

  const onFinish = (values) => {

    axiosInst
      .post("/sign/in", {
        "mobile": values.username,
        "password": values.password,
        "role": identity,
      })
      .then((res) => {
        if(res.user_id)
          localStorage.setItem("user_id", res.user_id);
        if(res.user_nickname)
          localStorage.setItem("user_nickname", res.user_nickname);
        localStorage.setItem("accessToken", res.accessToken);
        (identity === 'user') ? 
        localStorage.setItem("userToken", res.userToken) 
        :
        localStorage.setItem("adminToken", res.adminToken)
        history.push(`/${identity}`);
      })
  };


  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: false,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: '请输入用户名(手机号)!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名(手机号)" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>

      {/* 普通用户可以点击进行注册账户，管理员无注册通道 */}
      <Form.Item style={{display: (identity === "user") ? "inherit" : "none"}}>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>
        <Link to="/sign/up">还没有账号？现在注册</Link>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<LoginOutlined />} className="login-form-button" style={{width: "100%"}}>
          登&nbsp;&nbsp;&nbsp;&nbsp;录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignIn;