import React from "react";
import { Route } from "react-router-dom";

const createRoute = (props) => {
  let Component = props.component;
  return <Route {...props} render={(props) => <Component {...props} />} />;
};

export default createRoute;
