/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "shared/utility";

const initialState = {
  sites: [],
  loading: false,
  error: null,
  site: null
};

const getSite = state => {
  return updateObject(state, { loading: true, error: null });
};

const getSiteSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, site: action.site });
};

const getSiteFailure = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    site: null
  });
};

const getSiteList = state => {
  return updateObject(state, { loading: true, error: null });
};

const getSiteListSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, sites: action.sites });
};

const getSiteListFailure = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    sites: []
  });
};

const createSite = state => {
  return updateObject(state, { loading: true, error: null });
};

const createSiteSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, site: action.site });
};

const createSiteFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const deleteSite = state => {
  return updateObject(state, { loading: true, error: null });
};

const deleteSiteSuccess = state => {
  return updateObject(state, { loading: false, error: null });
};

const deleteSiteFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const updateSite = state => {
  return updateObject(state, { loading: true, error: null });
};

const updateSiteSuccess = state => {
  return updateObject(state, { loading: false, error: null });
};

const updateSiteFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const patchSite = state => {
  return updateObject(state, { loading: true, error: null });
};

const patchSiteSuccess = state => {
  return updateObject(state, { loading: false, error: null });
};

const patchSiteFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const sitesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SITE:
      return getSite(state);

    case actionTypes.GET_SITE_SUCCESS:
      return getSiteSuccess(state, action);

    case actionTypes.GET_SITE_FAILURE:
      return getSiteFailure(state, action);

    case actionTypes.GET_SITE_LIST:
      return getSiteList(state);

    case actionTypes.GET_SITE_LIST_SUCCESS:
      return getSiteListSuccess(state, action);

    case actionTypes.GET_SITE_LIST_FAILURE:
      return getSiteListFailure(state, action);

    case actionTypes.CREATE_SITE:
      return createSite(state);

    case actionTypes.CREATE_SITE_SUCCESS:
      return createSiteSuccess(state, action);

    case actionTypes.CREATE_SITE_FAILURE:
      return createSiteFailure(state, action);

    case actionTypes.DELETE_SITE:
      return deleteSite(state);

    case actionTypes.DELETE_SITE_SUCCESS:
      return deleteSiteSuccess(state);

    case actionTypes.DELETE_SITE_FAILURE:
      return deleteSiteFailure(state, action);

    case actionTypes.UPDATE_SITE:
      return updateSite(state);

    case actionTypes.UPDATE_SITE_SUCCESS:
      return updateSiteSuccess(state);

    case actionTypes.UPDATE_SITE_FAILURE:
      return updateSiteFailure(state, action);

    case actionTypes.PATCH_SITE:
      return patchSite(state);

    case actionTypes.PATCH_SITE_SUCCESS:
      return patchSiteSuccess(state);

    case actionTypes.PATCH_SITE_FAILURE:
      return patchSiteFailure(state, action);

    default:
      return state;
  }
};

export default sitesReducer;
