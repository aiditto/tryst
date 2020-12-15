import * as actionTypes from "./actionTypes";
import siteChannelsService from "services/siteChannels.service";

const getSiteChannelList = () => ({
  type: actionTypes.GET_SITE_CHANNEL_LIST
});

const getSiteChannelListSuccess = channels => ({
  type: actionTypes.GET_SITE_CHANNEL_LIST_SUCCESS,
  channels: channels
});

const getSiteChannelListFailure = error => ({
  type: actionTypes.GET_SITE_CHANNEL_LIST_FAILURE,
  error: error
});

const patchSiteChannelList = () => ({
  type: actionTypes.PATCH_SITE_CHANNEL_LIST
});

const patchSiteChannelListSuccess = () => ({
  type: actionTypes.PATCH_SITE_CHANNEL_LIST_SUCCESS
});

const patchSiteChannelListFailure = error => ({
  type: actionTypes.PATCH_SITE_CHANNEL_LIST_FAILURE,
  error: error
});

export const getSiteChannels = siteId => {
  return dispatch => {
    dispatch(getSiteChannelList());
    siteChannelsService.list(siteId, response => {
      if (response.status === 200) {
        dispatch(getSiteChannelListSuccess(response.data));
      } else {
        dispatch(getSiteChannelListFailure(response.data));
      }
    });
  };
};

export const patchSiteChannels = (siteId, data) => {
  return (dispatch, getState) => {
    dispatch(patchSiteChannelList());
    siteChannelsService.patch(siteId, data, response => {
      if (response.status === 200) {
        dispatch(patchSiteChannelListSuccess());
      } else {
        dispatch(patchSiteChannelListFailure(response.message));
      }
    });
  };
};
