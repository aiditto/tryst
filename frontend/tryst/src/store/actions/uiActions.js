import * as actionTypes from "./actionTypes";

const showSnackbar = (message, alertType) => {
  return {
    type: actionTypes.SHOW_NOTIFICATION,
    message: message,
    alertType: alertType
  };
};

const hideSnackbar = () => {
  return {
    type: actionTypes.HIDE_NOTIFICATION
  };
};

export const showNotification = (message, alertType) => {
  return dispatch => {
    dispatch(showSnackbar(message, alertType));
  };
};

export const hideNotification = () => {
  return dispatch => {
    dispatch(hideSnackbar());
  };
};
