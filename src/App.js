import React from 'react';
import './App.less';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Sign from './Sign';
import Admin from './Admin';
import User from './User';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/sign">
          <Sign />
        </Route>

        <Route path="/admin">
          <Admin />
        </Route>

        <Route path="/user">
          <User />
        </Route>

        <Redirect to="/sign" />
      </Switch>
    </Router>
  )
}

export default App;