import { Redirect, Route, Switch } from "react-router-dom";
import DebtPool from './views/debtPool';
import Dex from './views/dex';
import Form from './views/form';

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/">
        <DebtPool />
        <Dex />
      </Route>
      <Route exact path={"/form"}>
        <Form />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Navigation;