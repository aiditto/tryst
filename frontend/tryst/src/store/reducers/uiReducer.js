/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  show: false,
  alertType: "success",
  message: ""
};

const showSnackbar = (state, action) => {
  return updateObject(state, { show: true, alertType: action.alertType, message: action.message });
};

const hideSnackbar = (state, action) => {
  return updateObject(state, {
    show: false,
    alertType: "success",
    message: ""
  });
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      return showSnackbar(state, action);

    case actionTypes.HIDE_NOTIFICATION:
      return hideSnackbar(state, action);

    default:
      return state;
  }
};

export default uiReducer;
