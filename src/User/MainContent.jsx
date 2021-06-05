import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import MovieTable from './MovieTable.jsx';
import InfoCard from "./InfoCard";

/**
 * 上中下布局的 Content 部分子组件
 */
const MainContent = () => {

  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/home`}>
        <MovieTable operation="null"/>
      </Route>
      <Route path={`${path}/search`}>
        <MovieTable operation="search"/>
      </Route>
      <Route path={`${path}/sort`}>
        <MovieTable operation="sort"/>
      </Route>
      <Route path={`${path}/personal`}>
        <InfoCard />
      </Route>
      {/* <Route exact path={`${path}/personal/info`}>
        <div>info</div>
      </Route>
      <Route exact path={`${path}/personal/history`}>
        <div>history</div>
      </Route> */}
      {/* <Route path={`${path}/aboutme`}>
        <div>456</div>
      </Route> */}
      <Redirect to={`${path}/home`}/>
    </Switch>
  )
}

export default MainContent;