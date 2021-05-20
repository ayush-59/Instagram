import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

export default function ProtectedRoute({
  user,
  children,
  redirectPath,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }
        if (!user) {
          return (
            <Redirect
              to={{
                pathname: redirectPath,
                state: { from: location },
              }}
            />
          );
        }
        return null;
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  path: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};
