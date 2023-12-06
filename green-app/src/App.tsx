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
import Analytics from './analytics';


const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/sign-in-side" exact component={SignInSide} />
      <Route path="/home" exact component={Home} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/add-entry" exact component={AddEntry} />
      <Route path="/analytics" exact component={Analytics} />
      <Redirect from="/" to="/home" />
    </Switch>
  </Router>
);

export default App;
