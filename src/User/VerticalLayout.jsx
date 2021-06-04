import { Layout, Menu, Affix } from 'antd';
import MainContent from "./MainContent";
import { useHistory } from "react-router-dom";
import { 
  HomeOutlined,
  UserOutlined,
  // PhoneOutlined
} from '@ant-design/icons';


const { Header, Content, Footer } = Layout;
// const { SubMenu } = Menu;

const VerticalLayout = () => {

  let history = useHistory();

  return (
    <Layout className="layout">
      <Affix offsetTop="0">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => {return history.push("/user/home");}}>主页</Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} onClick={() => {return history.push("/user/personal");}}>个人中心</Menu.Item>
          {/* <SubMenu key="2" title="个人中心" icon={<UserOutlined />} onClick={() => {return history.push("/user/personal");}}> */}
            {/* <Menu.ItemGroup title="Item 1"> */}
              {/* <Menu.Item key="setting:1" onClick={() => {return history.push("/history");}}>历史动态</Menu.Item>
              <Menu.Item key="setting:2" onClick={() => {return history.push("/info");}}>个人资料</Menu.Item> */}
            {/* </Menu.ItemGroup> */}
            {/* <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup> */}
          {/* </SubMenu> */}
          {/* <Menu.Item key="3" icon={<PhoneOutlined />} onClick={() => {return history.push("/user/aboutme");}}>关于我</Menu.Item> */}
        </Menu>
      </Header>
      </Affix>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content"><MainContent /></div>
      </Content>
      {/* <Affix offsetBottom="0"> */}
      <Footer style={{ textAlign: 'center' }}>Movies Web App ©2021 Created by Fan YiHua</Footer>
      {/* </Affix> */}
    </Layout>
  )
}


export default VerticalLayout;