import { Redirect, Route, Switch } from "react-router-dom";
import Home from './views/Home';

const Navigation = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Navigation;