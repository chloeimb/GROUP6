import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './Login';
import Home from './Home';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/home" exact component={Home} />
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>
);

export default App;
