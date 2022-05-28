import { Redirect, Route, Switch } from "react-router-dom";
import DebtPool from './views/DebtPool';

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/">
        <DebtPool />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Navigation;