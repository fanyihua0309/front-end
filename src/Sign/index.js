import SignIn from './SignIn.jsx';
import SignUp from './SignUp.jsx'
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import Layout from './Layout.jsx';

const Sign = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/in`}>
        {/* <SignIn /> */}
        <Layout formLable="登 录 账 户" render={<SignIn />} />
      </Route>

      <Route path={`${path}/up`}>
        {/* <SignUp /> */}
        <Layout formLable="注 册 账 户" render={<SignUp />} />
      </Route>

      <Redirect to={`${path}/in`}/>
    </Switch>
  )
}

export default Sign;