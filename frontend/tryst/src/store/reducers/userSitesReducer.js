/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  sites: [],
  loading: false,
  error: null
};

const getUserSiteList = state => {
  return updateObject(state, { loading: true, error: null });
};

const getUserSiteListSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, sites: action.sites });
};

const getUserSiteListFailure = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    sites: []
  });
};

const userSitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERSITE_LIST:
      return getUserSiteList(state);

    case actionTypes.GET_USERSITE_LIST_SUCCESS:
      return getUserSiteListSuccess(state, action);

    case actionTypes.GET_USERSITE_LIST_FAILURE:
      return getUserSiteListFailure(state, action);

    default:
      return state;
  }
};

export default userSitesReducer;
