import * as actionTypes from "./actionTypes";
import userSitesService from "services/userSites.service";

const getUserSiteList = () => ({
  type: actionTypes.GET_USER_SITE_LIST
});

const getUserSiteListSuccess = sites => ({
  type: actionTypes.GET_USER_SITE_LIST_SUCCESS,
  sites: sites
});

const getUserSiteListFailure = error => ({
  type: actionTypes.GET_USER_SITE_LIST_FAILURE,
  error: error
});

export const getUserSites = userId => {
  return dispatch => {
    dispatch(getUserSiteList());
    userSitesService.list(userId, response => {
      if (response.status === 200) {
        dispatch(getUserSiteListSuccess(response.data));
      } else {
        dispatch(getUserSiteListFailure(response.data));
      }
    });
  };
};
