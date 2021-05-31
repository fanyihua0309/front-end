import { Layout, Menu } from 'antd';
import {
  FileOutlined,
  EditOutlined,
  PlusSquareOutlined,
  CloseSquareOutlined,
  ZoomOutOutlined
} from '@ant-design/icons';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MainContent from './MainContent.jsx';

const { Header, Content, Footer, Sider } = Layout;


const SiderLayout = () => {
  const [collapsed, setcollapsed] = useState(false);

  const onCollapse = () => {
    setcollapsed(!collapsed);
  };

  let history = useHistory();
  console.log(history);
  const handleClick = () => {
    history.push("/add");
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<FileOutlined />}>
            浏览
          </Menu.Item>
          <Menu.Item key="2" icon={<PlusSquareOutlined />} onClick={handleClick}>
            新建
          </Menu.Item>
          <Menu.Item key="3" icon={<EditOutlined />}>
            编辑
          </Menu.Item>
          <Menu.Item key="4" icon={<ZoomOutOutlined />}>
            查询
          </Menu.Item>
          <Menu.Item key="5" icon={<CloseSquareOutlined />}>
            删除
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <MainContent />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Movies Management System ©2021 Created by Fan Yihua</Footer>
      </Layout>
    </Layout>
  );
}

export default SiderLayout;