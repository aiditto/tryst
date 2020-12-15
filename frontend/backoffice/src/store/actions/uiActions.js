import * as actionTypes from "./actionTypes";
import { actions } from "react-table";

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

export const toggleDrawer = () => {
  return { type: actionTypes.TOGGLE_DRAWER };
};

export const redirect = link => {
  return { type: actionTypes.REDIRECT, payload: link };
};

export const removeRedirect = () => {
  return { type: actionTypes.REDIRECT_REMOVE };
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
