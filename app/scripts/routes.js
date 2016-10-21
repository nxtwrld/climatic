import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import createHistory from 'history/lib/createHashHistory'

import App from './pages/app.jsx';
import Place from './pages/place.jsx';
import Version from './pages/version.jsx';
import NotFound from './pages/notFound.jsx';

const historyOptions = {
  queryKey : false
};

const routes = (
  <Router history={createHistory(historyOptions)}  locales={['en-US']} >
    <Route path='/' component={ App }>
      <IndexRoute component={ Place }/>
      <Route path='place' component={ Place } />
      <Route path='place/:id' component={ Place } />
      <Route path='version' component={ Version } />
      <Route path='*' component={NotFound}/>
    </Route>
  </Router>
);

export default routes;
