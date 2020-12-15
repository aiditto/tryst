import * as actionTypes from "./actionTypes";
import sitesService from "services/sites.service";
import * as actions from "./rootAction";

const getSiteList = () => ({
  type: actionTypes.GET_SITE_LIST
});

const getSiteListSuccess = sites => ({
  type: actionTypes.GET_SITE_LIST_SUCCESS,
  sites: sites
});

const getSiteListFailure = error => ({
  type: actionTypes.GET_SITE_LIST_FAILURE,
  error: error
});

const getSite = () => ({
  type: actionTypes.GET_SITE
});

const getSiteSuccess = site => ({
  type: actionTypes.GET_SITE_SUCCESS,
  site: site
});

const getSiteFailure = error => ({
  type: actionTypes.GET_SITE_FAILURE,
  error: error
});

const createSite = () => ({
  type: actionTypes.CREATE_SITE
});

const createSiteSuccess = site => ({
  type: actionTypes.CREATE_SITE_SUCCESS,
  site: site
});

const createSiteFailure = error => ({
  type: actionTypes.CREATE_SITE_FAILURE,
  error: error
});

const deleteSite = () => ({
  type: actionTypes.DELETE_SITE
});

const deleteSiteSuccess = () => ({
  type: actionTypes.DELETE_SITE_SUCCESS
});

const deleteSiteFailure = error => ({
  type: actionTypes.DELETE_SITE_FAILURE,
  error: error
});

const updateSite = () => ({
  type: actionTypes.UPDATE_SITE
});

const updateSiteSuccess = () => ({
  type: actionTypes.UPDATE_SITE_SUCCESS
});

const updateSiteFailure = error => ({
  type: actionTypes.UPDATE_SITE_FAILURE,
  error: error
});

const patchSite = () => ({
  type: actionTypes.PATCH_SITE
});

const patchSiteSuccess = () => ({
  type: actionTypes.PATCH_SITE_SUCCESS
});

const patchSiteFailure = error => ({
  type: actionTypes.PATCH_SITE_FAILURE,
  error: error
});

export const getSites = () => {
  return dispatch => {
    dispatch(getSiteList());
    sitesService.list(response => {
      if (response.status === 200) {
        dispatch(getSiteListSuccess(response.data));
      } else {
        dispatch(getSiteListFailure(response.data));
      }
    });
  };
};

export const getSiteById = siteId => {
  return dispatch => {
    dispatch(getSite());
    sitesService.getSiteById(siteId, response => {
      if (response.status === 200) {
        dispatch(getSiteSuccess(response.data));
      } else {
        dispatch(getSiteFailure(response.data));
      }
    });
  };
};

export const createNewSite = (data, t) => {
  return (dispatch, getState) => {
    dispatch(createSite());
    sitesService.addSite(data, response => {
      if (response.status === 200) {
        dispatch(createSiteSuccess(response.data));
        const userId = getState().auth.user.userId;
        dispatch(actions.getUserSites(userId));
        dispatch(actions.showNotification(t("notification.site_added_success"), "success"));
        dispatch(actions.redirect("/sites"));
      } else {
        dispatch(createSiteFailure(response.message));
        dispatch(actions.showNotification(t("notification.site_added_error"), "error"));
      }
    });
  };
};

export const deleteSiteById = (siteId, t) => {
  return (dispatch, getState) => {
    dispatch(deleteSite());
    sitesService.deleteSite(siteId, response => {
      if (response.status === 204) {
        dispatch(deleteSiteSuccess());
        const userId = getState().auth.user.userId;
        dispatch(actions.getUserSites(userId));
        dispatch(actions.showNotification(t("notification.site_deleted_success"), "success"));
      } else {
        dispatch(deleteSiteFailure(response.message));
        dispatch(actions.showNotification(t("notification.site_deleted_error"), "error"));
      }
    });
  };
};

export const updateSiteById = (siteId, data, t) => {
  return (dispatch, getState) => {
    dispatch(updateSite());
    sitesService.updateSite(siteId, data, response => {
      if (response.status === 204) {
        dispatch(updateSiteSuccess());
        const userId = getState().auth.user.userId;
        dispatch(actions.getUserSites(userId));
        dispatch(actions.showNotification(t("notification.site_updated_success"), "success"));
        dispatch(actions.redirect("/sites"));
      } else {
        dispatch(updateSiteFailure(response.message));
        dispatch(actions.showNotification(t("notification.site_updated_error"), "error"));
      }
    });
  };
};

export const patchSiteById = (siteId, data, t, mode) => {
  return (dispatch, getState) => {
    dispatch(patchSite());
    sitesService.patchSite(siteId, data, response => {
      if (response.status === 204) {
        dispatch(patchSiteSuccess());
        dispatch(actions.getSiteById(siteId));
        const userId = getState().auth.user.userId;
        dispatch(actions.getUserSites(userId));
        dispatch(actions.showNotification(t("notification.site_patch_success"), "success"));
        if (mode && mode === "update-site") {
          dispatch(actions.redirect("/sites"));
        }
      } else {
        dispatch(patchSiteFailure(response.message));
        dispatch(actions.showNotification(t("notification.site_patch_error"), "error"));
      }
    });
  };
};

export const getSiteByIdentifier = siteIdentifier => {
  return dispatch => {
    dispatch(getSite());
    sitesService.getSiteByIdentifier(siteIdentifier, response => {
      if (response.status === 200) {
        dispatch(getSiteSuccess(response.data[0]));
      } else {
        dispatch(getSiteFailure(response.data));
      }
    });
  };
};
