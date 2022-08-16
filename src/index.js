import React from 'react';
import ReactDOM from 'react-dom/client';
import Authentication from './pages/Authentication/Authentication';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Endpoint from './data/Endpoint';

import 'normalize.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Switch>
      <Route path={[Endpoint.login, Endpoint.signUp]} component={Authentication} />
    </Switch>
  </BrowserRouter>
);