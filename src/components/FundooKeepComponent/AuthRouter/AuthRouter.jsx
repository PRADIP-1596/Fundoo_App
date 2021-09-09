import React from "react";
import { Redirect, Route } from "react-router";

export default function AuthRouter({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (localStorage.getItem("token")) {
          return <Redirect to="/fundooKeep/notes" />;
        }
        return <Component {...props} />;
      }}
    />
  );
}