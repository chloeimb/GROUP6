import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './Home';
import SignInSide from './SignInSide';
import Profile from './Profile';
import AddEntry from './AddEntry';
import Dashboard from './Dashboard';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/sign-in-side" exact component={SignInSide} />
      <Route path="/home" exact component={Home} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/dashboard" exact component={Dashboard} />
      <Route path="/add-entry" exact component={AddEntry} />
      <Redirect from="/" to="/sign-in-side" />
    </Switch>
  </Router>
);

export default App;
