import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import AddMovie from './AddMovie.jsx';
import MovieTable from './MovieTable.jsx';


/**
 * 侧边栏布局的 Content 部分子组件
 */
const MainContent = () => {

  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/show`}>
        <MovieTable operation="null"/>
      </Route>
      <Route path={`${path}/add`}>
        <AddMovie />
      </Route>
      <Route path={`${path}/search`}>
        <MovieTable operation="search"/>
      </Route>
      <Route path={`${path}/delete`}>
        <MovieTable operation="delete"/>
      </Route>
      <Route path={`${path}/edit`}>
        <MovieTable operation="edit"/>
      </Route>
      <Route path={`${path}/sort`}>
        <MovieTable operation="sort"/>
      </Route>
      <Redirect to={`${path}/show`}/>
    </Switch>
  )
}

export default MainContent;