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

const inviteUser = () => ({
  type: actionTypes.INVITE_USER
});

const inviteUserSuccess = _data => ({
  type: actionTypes.INVITE_USER_SUCCESS
});

const inviteUserFailure = error => ({
  type: actionTypes.INVITE_USER_FAILURE,
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

export const inviteUserbyEmail = (data, siteId, t) => {
  return dispatch => {
    dispatch(inviteUser());
    authenticationService.inviteUser(data, siteId, response => {
      if (response.status === 200) {
        dispatch(inviteUserSuccess(response.data));
        dispatch(actions.showNotification(t("notification.invite_user_success"), "success"));
        // TODO: Make it to specific site
        dispatch(actions.redirect("/sites"));
      } else {
        dispatch(inviteUserFailure(response.message));
        dispatch(actions.showNotification(t("notification.invite_user_error"), "error"));
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
