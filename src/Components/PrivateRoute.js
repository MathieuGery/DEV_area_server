import React from "react";
import { Route, Redirect } from "react-router-dom";
import API from "../Utils/api"

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={(props) => {
            if (API.isAuth() === false) {
                return <Redirect to="/sign-in" />;
            } else {
                return <Component {...props} />;
            }
        }}
    />
);