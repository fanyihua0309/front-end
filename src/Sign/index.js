import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import Layout from './Layout.jsx';

const Sign = () => {
  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/in`}>
        <Layout formTitle="登 录 账 户" />
      </Route>

      <Route path={`${path}/up`}>
        <Layout formTitle="注 册 账 户" />
      </Route>

      <Redirect to={`${path}/in`}/>
    </Switch>
  )
}

export default Sign;