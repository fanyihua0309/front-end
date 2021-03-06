import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import MovieTable from './MovieTable.jsx';
import PersonalCenterGridCard from "./PersonalCenterGridCard";

/**
 * 上中下布局的 Content 部分子组件
 */
const MainContent = () => {

  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/home`}>
        <MovieTable operation="home"/>
      </Route>
      <Route path={`${path}/search`}>
        <MovieTable operation="search"/>
      </Route>
      <Route path={`${path}/sort`}>
        <MovieTable operation="sort"/>
      </Route>
      <Route path={`${path}/personal`}>
        <PersonalCenterGridCard />
      </Route>
      <Redirect to={`${path}/home`}/>
    </Switch>
  )
}


export default MainContent;