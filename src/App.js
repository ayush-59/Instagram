import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import * as ROUTES from "./constant/routes";

function App() {
  const Login = lazy(() => import("./pages/login"));
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login}></Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
