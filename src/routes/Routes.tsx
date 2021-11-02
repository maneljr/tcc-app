import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { SignIn, HomePage } from '../pages';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={SignIn} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export { Routes };
