import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import axiosInst from '../initAxios.js';
import { useState, useEffect } from "react";

const { Meta } = Card;

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
    <div className="site-card-border-less-wrapper">
    <Card
      style={{ width: 300 }}
      // cover={
      //   <img
      //     alt="example"
      //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
      //   />
      // }
      actions={[
        <SettingOutlined key="setting" />,
        <EditOutlined key="edit" />,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
        title={userInfo.nickname}
        description={userInfo.mobile}
      />
    </Card>
    </div>
  )
}

export default InfoCard;