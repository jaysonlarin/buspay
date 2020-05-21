import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from '../../packs/src/history';
import Home from "../Home";
import List from "../List";
import Checkout from '../Checkout';

export default (
  <Router history={history}>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/list" exact component={List} />
      <Route path="/checkout" exact component={Checkout} />
    </Switch>
  </Router>
);