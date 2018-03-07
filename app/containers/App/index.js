/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import ForgotPasswordPage from 'containers/ForgotPasswordPage/Loadable';
import ResetPasswordPage from 'containers/ResetPasswordPage/Loadable';
import GuidePage from 'containers/GuidePage/Loadable';
import MainPage from 'containers/MainPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import API from 'components/Apicall';

export default function App() {
  return (
    <Router
      basename={API.PATH_PREFIX} >
      <div>
        <Switch>
          <Route exact path="/" component={LoginPage} />
         
          <Route exact path="/setup" component={ HomePage } />
          <Route exact path="/forgot" component={ForgotPasswordPage} />
          <Route exact path="/reset" component={ResetPasswordPage} />
          <Route exact path="/guide" component={GuidePage} />
          <Route exact path="/trending" component={MainPage} />
          
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
}
