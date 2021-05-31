import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import MovieTable from './MovieTable.jsx';
// import InputForm from "./InputForm.jsx";
import AddMovie from './AddMovie.jsx';
// import SearchForm from './SearchForm.jsx';


const MainContent = () => {

  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/movies`}>
        <MovieTable operation="null"/>
      </Route>
      <Route path={`${path}/add`}>
        <AddMovie />
      </Route>
      <Route path={`${path}/search`}>
        {/* <SearchForm /> */}
      </Route>
      <Route path={`${path}/delete`}>
        <MovieTable operation="delete"/>
      </Route>
      <Route path={`${path}/edit`}>
        <MovieTable operation="edit"/>
      </Route>
      <Redirect to={`${path}/movies`}/>
    </Switch>
  )

}

export default MainContent;