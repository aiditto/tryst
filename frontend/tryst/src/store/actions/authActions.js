import * as actionTypes from "./actionTypes";
import * as actions from "./rootAction";
import authenticationService from "services/auth.service";

const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  };
};

const loginSuccess = token => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    token: token
  };
};

const loginFail = error => {
  return {
    type: actionTypes.LOGIN_FAILURE,
    error: error
  };
};

const getUser = () => ({
  type: actionTypes.GET_USER
});

const getUserSuccess = user => ({
  type: actionTypes.GET_USER_SUCCESS,
  user: user
});

const getUserFailure = error => ({
  type: actionTypes.GET_USER_FAILURE,
  error: error
});

export const logoutStart = () => {
  return {
    type: actionTypes.LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const login = (email, password) => {
  return dispatch => {
    dispatch(loginStart());
    authenticationService.login(email, password, response => {
      if (response.status === 200) {
        dispatch(loginSuccess(response.data.token));
        //Add timeout with expiry date coming from data
        const expirationTime = response.data.expiresAt - new Date().getTime();
        dispatch(checkAuthTimeout(expirationTime));
      } else {
        dispatch(loginFail(response.message));
      }
    });
  };
};

export const getUserId = () => {
  return dispatch => {
    dispatch(getUser());
    authenticationService.getUser(response => {
      if (response.status === 200) {
        dispatch(getUserSuccess(response.data));
      } else {
        dispatch(getUserFailure(response.message));
      }
    });
  };
};

export const logout = t => {
  return dispatch => {
    dispatch(logoutStart());
    setTimeout(() => {
      authenticationService.logout();
    }, 500);
    dispatch(actions.showNotification(t("notification.session_timeout"), "warning"));
  };
};
