import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import Analytics from './Analytics';
import AddEntry from './AddEntry';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/home" exact component={Home} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/analytics" exact component={Analytics} />
      <Route path="/add-entry" exact component={AddEntry} />
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>
);

export default App;
