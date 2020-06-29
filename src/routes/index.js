import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

/* Import components here */
import CreatRoute from "./createRoutes";
import signIn from "../containers/signIn";
import SignUP from "../containers/signUp";
import Profile from "../containers/profile";
import Error from "../containers/error";
import cookieUtils from "../utils/cookieUtils";

// authentication handler
const handleAuthentication = (Component, login) => {
  if (login && login.auth) {
    return Component;
  } else {
    return <Redirect to="/signin" />;
  }
};

/* Include routes here*/
const Routes = () => {
  let login = cookieUtils.getCookie("auth");
  if (login) {
    login = JSON.parse(login);
  }
  return (
    <Router>
      <CreatRoute exact path="/signin" component={signIn} />
      <CreatRoute exact path="/signup" component={SignUP} />
      <Switch>
        <Route
          path="/"
          exact
          render={(props) =>
            handleAuthentication(<Profile {...props} />, login)
          }
        />
        <Route
          exact
          path="/error"
          render={(props) =>
            handleAuthentication(<Error compName="error" {...props} />, login)
          }
        />
      </Switch>
    </Router>
  );
};

// export default connect(mapStateToProps)(Routes);
export default Routes;
