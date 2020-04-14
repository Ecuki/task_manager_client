import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../context/auth";

export function NoAuthRoute({ component: Comoponent, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props => (user ? <Redirect to="/" /> : <Comoponent {...props} />)}
    />
  );
}

export function AuthRoute({ component: Comoponent, ...rest }) {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={props =>
        user ? <Comoponent {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
