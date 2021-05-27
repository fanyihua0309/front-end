import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx'
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import Layout from './Layout.jsx';

const Sign = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/in`}>
        <Layout>
          <h2>登 录 账 户</h2>
          <SignIn />
        </Layout>
      </Route>

      <Route path={`${path}/up`}>
        <Layout>
          <h2>注 册 账 户</h2>
          <SignUp />
        </Layout>
      </Route>

      <Redirect to={`${path}/in`}/>
    </Switch>
  )
}

export default Sign;