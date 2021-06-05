import { Card, Button, Col, Row, Input, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import axiosInst from '../initAxios.js';
import { useState, useEffect } from "react";
import "../App.less"

// const { Meta } = Card;

const InfoCard = () => {

  const [userInfo, setuserInfo] = useState({});

  const requestUserInfo = () => {
    const user_id = localStorage.getItem("user_id");
    console.log(user_id);
    axiosInst
      .get(`/user/info/${user_id}`)
      .then((res) => {
        setuserInfo(res);
      })
  }

  useEffect(() => {
    requestUserInfo();
  }, [])

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={12}>
          <Card 
            title="个人资料页" 
            bordered={false} 
            style={{ width: 500, marginTop: 70 }}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            {/* <h2 style={{marginLeft: 30}}>{userInfo.nickname}</h2>
            <EditOutlined style={{zoom: "160%"}}/> */}
            <UserOutlined />
            <label icon={<UserOutlined />}>昵称</label>{userInfo.nickname}<br />
            <label icon={<UserOutlined />}>手机号码</label>{userInfo.mobile}
            {/* <Descriptions title="注册信息" bordered={true} layout="vertical" style={{marginTop: 40}}>
              <Descriptions.Item label="昵称">{userInfo.nickname}</Descriptions.Item>
              <Descriptions.Item label="手机号码">{userInfo.mobile}</Descriptions.Item>
              <Descriptions.Item label="邮箱">{userInfo.email}</Descriptions.Item>
            </Descriptions> */}
          </Card>
        </Col>

        <Col span={12}>
          <Card 
            title="个人资料页" 
            bordered={false} 
            style={{ width: 500, marginTop: 70 }}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
          <Input value={userInfo.nickname}/>
          <Button type="primary">修改昵称</Button><br />
          <Button type="primary">修改密码</Button>
        </Card>
      </Col>
    </Row>
  </div>
  )
}

export default InfoCard;