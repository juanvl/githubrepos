import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from 'pages/Main';
import Repo from 'pages/Repo';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/repo/:name" component={Repo} />
      </Switch>
    </BrowserRouter>
  );
}
