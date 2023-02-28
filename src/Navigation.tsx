import { Redirect, Route, Switch } from "react-router-dom";
import DebtPool from './views/DebtPool';
import Dex from './views/dex';
import BuyDebt from "./views/dex/components/BuyDebt";
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
      <Route exact path={'/buydebt'}>
        <BuyDebt />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Navigation;
