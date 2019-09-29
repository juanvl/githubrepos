import React from 'react';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Main from 'pages/Main';
import Repo from 'pages/Repo';

export default function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/repo/:name" component={Repo} />
      </Switch>
    </HashRouter>
  );
}
