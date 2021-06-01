import { Layout, Menu } from 'antd';
import {
  EyeOutlined,
  EditOutlined,
  PlusCircleOutlined,
  CloseCircleOutlined,
  SearchOutlined
} from '@ant-design/icons';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MainContent from './MainContent.jsx';

const { Header, Content, Footer, Sider } = Layout;

/**
 * 侧边栏布局组件
 */
const SiderLayout = () => {
  const [collapsed, setcollapsed] = useState(false);

  const onCollapse = () => {
    setcollapsed(!collapsed);
  };

  let history = useHistory();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1" icon={<EyeOutlined />} onClick={() => {return history.push("/admin/show");}}>
            浏览
          </Menu.Item>
          <Menu.Item key="2" icon={<PlusCircleOutlined />} onClick={() => {return history.push("/admin/add");}}>
            新增
          </Menu.Item>
          <Menu.Item key="3" icon={<CloseCircleOutlined />} onClick={() => {return history.push("/admin/delete");}}>
            删除
          </Menu.Item>
          <Menu.Item key="4" icon={<EditOutlined />} onClick={() => {return history.push("/admin/edit");}}>
            编辑
          </Menu.Item>
          <Menu.Item key="5" icon={<SearchOutlined />} onClick={() => {return history.push("/admin/search");}}>
            搜索
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