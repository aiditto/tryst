/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  token: null,
  loading: false,
  error: null,
  user: null
};

const loginStart = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const loginSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    token: action.token
  });
};

const loginFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    token: null
  });
};

const getUser = state => {
  return updateObject(state, { loading: true, error: null });
};

const getUserSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, user: action.user });
};

const getUserFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error, user: null });
};

const inviteUser = state => {
  return updateObject(state, { loading: true, error: null });
};

const inviteUserSuccess = (state, _action) => {
  return updateObject(state, { loading: false, error: null });
};

const inviteUserFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return loginStart(state, action);

    case actionTypes.LOGIN_SUCCESS:
      return loginSuccess(state, action);

    case actionTypes.LOGIN_FAILURE:
      return loginFail(state, action);

    case actionTypes.GET_USER:
      return getUser(state);

    case actionTypes.GET_USER_SUCCESS:
      return getUserSuccess(state, action);

    case actionTypes.GET_USER_FAILURE:
      return getUserFailure(state, action);

    case actionTypes.INVITE_USER:
      return inviteUser(state);

    case actionTypes.INVITE_USER_SUCCESS:
      return inviteUserSuccess(state, action);

    case actionTypes.INVITE_USER_FAILURE:
      return inviteUserFailure(state, action);

    default:
      return state;
  }
};

export default authReducer;
