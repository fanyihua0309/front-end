import { Layout, Menu } from 'antd';
import {
  FileOutlined,
  EditOutlined,
  PlusSquareOutlined,
  CloseSquareOutlined,
  ZoomOutOutlined
} from '@ant-design/icons';
import React from "react";
import MainContent from './MainContent.jsx';

const { Header, Content, Footer, Sider } = Layout;

class SiderLayout extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<FileOutlined />}>
              浏览
            </Menu.Item>
            <Menu.Item key="2" icon={<PlusSquareOutlined />}>
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
}

export default SiderLayout;