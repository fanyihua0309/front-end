import React from 'react';
import './App.less';
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Sign from './Sign';


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/sign">
          <Sign />
        </Route>

        <Redirect to="/sign" />
      </Switch>
    </Router>
  )
}

export default App;