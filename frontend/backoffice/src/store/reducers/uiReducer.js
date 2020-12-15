/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  show: false,
  alertType: "success",
  message: "",
  redirectTo: "",
  showDrawer: false
};

const toggleDrawer = (state, action) => {
  return updateObject(state, { showDrawer: !state.showDrawer });
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

const redirect = (state, action) => {
  return updateObject(state, {
    redirectTo: action.payload
  });
};

const removeRedirect = state => {
  return updateObject(state, {
    redirectTo: null
  });
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_NOTIFICATION:
      return showSnackbar(state, action);

    case actionTypes.HIDE_NOTIFICATION:
      return hideSnackbar(state, action);

    case actionTypes.REDIRECT:
      return redirect(state, action);

    case actionTypes.REDIRECT_REMOVE:
      return removeRedirect(state);

    case actionTypes.TOGGLE_DRAWER:
      return toggleDrawer(state, action);

    default:
      return state;
  }
};

export default uiReducer;
