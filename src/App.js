import React from 'react';
import './App.less';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  // Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import myHistory from "./initHistory.js";
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