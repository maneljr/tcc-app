import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { SignIn, HomePage, RegisterPlace, RegisterDoctor, Exams, SignUp, Recover } from '../pages';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/places" component={RegisterPlace} />
        <Route exact path="/doctors" component={RegisterDoctor} />
        <Route exact path="/Exams" component={Exams} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/recover" component={Recover} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export { Routes };
