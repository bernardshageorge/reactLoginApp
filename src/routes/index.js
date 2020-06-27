import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

/* Import components here */
import App from "../containers/App";

// authentication handler
const handleAuthentication = (Component) => {};

/* Include routes here*/
const Routes = () => {
  return (
    <Router>
      <CreatRoute path="/" component={App} />
      <Switch></Switch>
    </Router>
  );
};

// export default connect(mapStateToProps)(Routes);
export default Routes;
