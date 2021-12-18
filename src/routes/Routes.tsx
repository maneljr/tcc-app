import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { SignIn, HomePage, RegisterPlace, RegisterDoctor, Exams, SignUp, Recover } from '../pages';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/signin" component={SignIn} />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/places" component={RegisterPlace} />
      <Route exact path="/doctors" component={RegisterDoctor} />
      <Route exact path="/Exams" component={Exams} />
      <Route exact path="/recover" component={Recover} />
      <Route exact path="/signup" component={SignUp} />
    </Switch>
  );
};

export { Routes };
