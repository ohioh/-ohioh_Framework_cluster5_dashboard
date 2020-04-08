import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { Company } from 'container/Company';

export default function AppRouter(props) {
  return (
    <Switch>
      <Route path='/customer' component={Company} {...props} />
    </Switch>
  );
}