import "../App.less"
import { Tabs } from 'antd';
import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx';

const { TabPane } = Tabs;


const SignPage = ({ formTitle }) => {

  return (
    (formTitle === "登 录 账 户") ?
    (
      <main id="sign-page">
        <h2>Meet</h2>
        <div id="sign-form">
          <h2>{formTitle}</h2>
        <Tabs type="line" defaultActiveKey="1" centered size="large">
          <TabPane tab="用户" key="1">
            <SignIn identity="user"/>
          </TabPane>
          <TabPane tab="管理员" key="2">
            <SignIn identity="admin"/>
          </TabPane>
        </Tabs>
        </div>
        <h2>Movies</h2>
      </main>
    )
    :
    (
      <main id="sign-page">
        <div id="sign-form">
          <h2>{formTitle}</h2>
          <SignUp />
        </div>
      </main>
    )
  );
}

export default SignPage;