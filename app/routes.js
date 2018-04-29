import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import LoginPage from './containers/Login';
import LoggedInPage from './containers/LoggedIn';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoggedInPage} />
    {/* <Route path="loggedin" component={LoggedInPage} /> */}
  </Route>
);
