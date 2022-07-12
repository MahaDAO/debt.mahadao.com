import { Redirect, Route, Switch } from "react-router-dom";
import DebtPool from './views/debtPool';
import Dex from './views/dex';

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/">
        <DebtPool />
        <Dex />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Navigation;