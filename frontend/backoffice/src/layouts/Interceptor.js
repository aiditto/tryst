/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import LoadingScreen from "components/LoadingScreen/LoadingScreen";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import { isSessionValid, isUserValidated } from "shared/utility";

const Interceptor = props => {
  const locationProps = props.location;
  const history = useHistory();

  return (
    <>
      <LoadingScreen />
      {isUserValidated(history) || isSessionValid() ? (
        <Redirect to="/sites" />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { error: locationProps && locationProps.search.length !== 0 }
          }}
        />
      )}
    </>
  );
};

export default Interceptor;
