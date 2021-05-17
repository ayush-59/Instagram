import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import * as ROUTES from "./constants/routes";
import UserContext from "./context/user";
import useAuthListener from "./hooks/use-auth-listener";
import ProtectedRoute from "./helpers/protected-route";
import IsUserLoggedIn from "./helpers/is-user-logged-in";

function App() {
  const Login = lazy(() => import("./pages/login"));
  const SignUp = lazy(() => import("./pages/sign-up"));
  const Dashboard = lazy(() => import("./pages/dashboard"));
  const NotFound = lazy(() => import("./pages/not-found"));

  const user = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <IsUserLoggedIn
              user={user}
              path={ROUTES.LOGIN}
              redirectPath={ROUTES.DASHBOARD}
            >
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn
              user={user}
              path={ROUTES.SIGN_UP}
              redirectPath={ROUTES.DASHBOARD}
            >
              <SignUp />
            </IsUserLoggedIn>

            <ProtectedRoute
              user={user}
              path={ROUTES.DASHBOARD}
              redirectPath={ROUTES.LOGIN}
              exact
            >
              <Dashboard />
            </ProtectedRoute>
            <Route component={NotFound}></Route>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
