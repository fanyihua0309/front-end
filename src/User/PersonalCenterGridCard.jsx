import { Card, Col, Row, Avatar, Descriptions, Button, Modal, Form, Input, message } from 'antd';
import { EditOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons';
import axiosInst from '../initAxios.js';
import { useState, useEffect } from "react";
import "../App.less";
import MarkHistory from './MarkHistory';
import { useHistory } from "react-router-dom";


const PersonalCenterGridCard = () => {

  const [userInfo, setuserInfo] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModal2Visible, setIsModal2Visible] = useState(false);
  let history = useHistory();

  const requestUserInfo = (user_id) => {
    axiosInst
      .get(`/user/info/${user_id}`)
      .then((res) => {
        setuserInfo(res);
      })
  }

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    // 个人中心功能必须登录后使用
    if(!user_id) {
      message.info("您尚未登录, 请先登录再使用!");
      history.push("/sign/in");
    }
    requestUserInfo(user_id);
  }, [history])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleValuesChange = (changedValues, allValues) => {
    let userInfoCopy = Array.from(userInfo);
    userInfoCopy.nickname = allValues.nickname;
    userInfoCopy.mobile = allValues.mobile;
    userInfoCopy.email = allValues.email;
    setuserInfo(userInfoCopy);
  }

  const handleOk = () => {
    axiosInst
      .patch('/user/info', {
        id: Number(localStorage.getItem("user_id")),
        nickname: userInfo.nickname,
        mobile: userInfo.mobile,
        email: userInfo.email,
      })
    localStorage.setItem("user_nickname", userInfo.nickname);
    setIsModalVisible(false);
  };


  const showModal2 = () => {
    setIsModal2Visible(true);
  };

  const handleCancel2 = () => {
    setIsModal2Visible(false);
  };

  const handleValuesChange2 = (changedValues, allValues) => {
    let userInfoCopy = Array.from(userInfo);
    userInfoCopy.password = allValues.password;
    userInfoCopy.newPassword = allValues.newPassword;
    setuserInfo(userInfoCopy);
  }

  const handleOk2 = () => {
    axiosInst
      .patch("/user/info/password", {
        id: Number(localStorage.getItem("user_id")),
        password: userInfo.password,
        newPassword: userInfo.newPassword,
      })
    setIsModal2Visible(false);
  }

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_nickname");
    localStorage.removeItem("accessToken");
    history.push("/sign/in");
  }

  return (
    <div className="site-card-wrapper" style={{marginTop: 40}}>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="标记 喜欢 历史动态" bordered={false}>
            <MarkHistory show="like" user_nickname={localStorage.getItem("user_nickname")}/>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="标记 看过/评分 历史动态" bordered={false}>
            <MarkHistory show="see" user_nickname={localStorage.getItem("user_nickname")}/>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="个人资料页" bordered={false}>
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              <h2 style={{display: "inline", marginLeft: "16px"}}>{userInfo.nickname}</h2>
              <Button 
                icon={<LogoutOutlined />} 
                type="primary" 
                ghost 
                danger 
                shape="round"
                style={{marginLeft: 20}}
                onClick={handleLogout}
              >
                Logout
              </Button>
              <Descriptions title="注册信息" bordered={true} layout="vertical" style={{marginTop: 40}}>
                <Descriptions.Item label="昵称">{userInfo.nickname}</Descriptions.Item>
                <Descriptions.Item label="手机号码">{userInfo.mobile}</Descriptions.Item>
                <Descriptions.Item label="邮箱">{userInfo.email}</Descriptions.Item>
              </Descriptions>
              <Button type="primary" shape="round" ghost style={{margin: 15}} onClick={showModal} icon={<EditOutlined />}>修改注册信息</Button>
              <Modal 
                title="修改注册信息" 
                visible={isModalVisible} 
                onOk={handleOk} 
                onCancel={handleCancel}
                okText="确定"
                cancelText="取消"
              >
                <Form
                  labelCol={{
                    span: 4,
                  }}
                  wrapperCol={{
                    span: 12,
                  }}
                  layout="horizontal"
                  initialValues={{
                    "nickname": userInfo.nickname,
                    "mobile": userInfo.mobile,
                    "email": userInfo.email,
                  }
                  }
                  onValuesChange={(changedValues, allValues) => handleValuesChange(changedValues, allValues)}
                >
                  <Form.Item label="昵称" name="nickname">
                    <Input />
                  </Form.Item>
                  <Form.Item label="手机号码" name="mobile">
                    <Input />
                  </Form.Item>
                  <Form.Item label="邮箱" name="email">
                    <Input />
                  </Form.Item>
                </Form>
              </Modal>

              <Button type="primary" shape="round" ghost style={{margin: 15}} onClick={showModal2} icon={<EditOutlined />}>修改密码</Button>
              <Modal 
                title="修改密码" 
                visible={isModal2Visible} 
                onOk={handleOk2} 
                onCancel={handleCancel2}
                okText="确定"
                cancelText="取消"
              >
                <Form
                  labelCol={{
                    span: 4,
                  }}
                  wrapperCol={{
                    span: 12,
                  }}
                  layout="horizontal"
                  onValuesChange={(changedValues, allValues) => handleValuesChange2(changedValues, allValues)}
                >
                  <Form.Item 
                    label="旧密码" 
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: '请输入旧密码',
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item 
                    label="新密码" 
                    name="newPassword"
                    rules={[
                      {
                        required: true,
                        message: '请输入新密码',
                      }
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['newPassword']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: '请输入确认密码!',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('newPassword') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('两次输入的密码不匹配!'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                </Form>
              </Modal>
          </Card>
        </Col>
      </Row>
    </div> 
  )
}


export default PersonalCenterGridCard;