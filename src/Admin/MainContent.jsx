import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";
import MovieTable from './MovieTable.jsx';
import InputForm from "./InputForm.jsx";


const MainContent = () => {

  let { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={`${path}/movies`}>
        <MovieTable />
      </Route>
      <Route path={`${path}/add`}>
        <InputForm />
      </Route>
      <Route path={`${path}/search`}>
        <div>search</div>
      </Route>
      <Redirect to={`${path}/movies`}/>
    </Switch>
  )

}

export default MainContent;