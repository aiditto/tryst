import * as actionTypes from "./actionTypes";
import userSitesService from "services/userSites.service";

const getUserSitesList = () => ({
  type: actionTypes.GET_USERSITE_LIST
});

const getUserSitesListSuccess = sites => ({
  type: actionTypes.GET_USERSITE_LIST_SUCCESS,
  sites: sites
});

const getUserSitesListFailure = error => ({
  type: actionTypes.GET_USERSITE_LIST_FAILURE,
  error: error
});

export const getUserSites = userId => {
  return dispatch => {
    dispatch(getUserSitesList());
    userSitesService.list(userId, response => {
      if (response.status === 200) {
        dispatch(getUserSitesListSuccess(response.data));
      } else {
        dispatch(getUserSitesListFailure(response.data));
      }
    });
  };
};
