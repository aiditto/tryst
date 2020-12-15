/* eslint-disable react/prop-types */
import React from "react";
import { Redirect, Route } from "react-router-dom";
import authenticationService from "../services/auth.service";

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (authenticationService.isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />)}
  />
);

export default AuthRoute;
