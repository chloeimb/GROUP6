import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { AuthProvider, useAuth } from './auth-context';
import Home from './Home';
import SignInSide from './SignInSide';
import Profile from './Profile';
import AddEntry from './AddEntry';
import Dashboard from './Dashboard';

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <Switch>
        <Route path="/sign-in-side" exact component={() => <SignInSide />} />
        <Route path="/home" exact component={() => <Home />} />
        <Route path="/profile" exact component={() => <Profile />} />
        <Route path="/dashboard" exact component={() => <Dashboard />} />
        <Redirect from="/" to="/sign-in-side" />
      </Switch>
    </AuthProvider>
  </Router>
);

export default App;
