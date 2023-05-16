import React from "react";
import { Route, Redirect } from "react-router-dom";
import Layout from "common/Layout";
// eslint-disable-next-line react/prop-types

export function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return localStorage.getItem("user") ? (
          <Layout>{children}</Layout>
        ) : (
          <Redirect to="/login" replace />
        );
      }}
    />
  );
}
