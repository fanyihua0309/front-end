import { Layout, Menu, Affix } from 'antd';
import MainContent from "./MainContent";
import { useHistory } from "react-router-dom";
import { 
  HomeOutlined,
  UserOutlined,
  SearchOutlined,
  StockOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer } = Layout;


const VerticalLayout = () => {

  let history = useHistory();

  return (
    <Layout className="layout">
      <Affix offsetTop="0">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />} onClick={() => {return history.push("/user/home");}}>主页</Menu.Item>
          <Menu.Item key="2" icon={<SearchOutlined />} onClick={() => {return history.push("/user/search");}}>检索</Menu.Item>
          <Menu.Item key="3" icon={<StockOutlined />} onClick={() => {return history.push("/user/sort");}}>排序</Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />} onClick={() => {return history.push("/user/personal");}}>个人中心</Menu.Item>
        </Menu>
      </Header>
      </Affix>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content"><MainContent /></div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Meet Movies Web App ©2021 Created by Fan YiHua</Footer>
    </Layout>
  )
}


export default VerticalLayout;