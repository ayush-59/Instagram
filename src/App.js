import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import * as ROUTES from "./constants/routes";

function App() {
  const Login = lazy(() => import("./pages/login"));
  const SignUp = lazy(() => import("./pages/sign-up"));
  return (
    <Router>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login}></Route>
          <Route path={ROUTES.SIGN_UP} component={SignUp}></Route>
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
