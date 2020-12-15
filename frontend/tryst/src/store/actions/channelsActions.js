import * as actionTypes from "./actionTypes";
import channelsService from "services/channels.service";
import * as actions from "./rootAction";

const getChannelList = () => ({
  type: actionTypes.GET_CHANNEL_LIST
});

const getChannelListSuccess = channels => ({
  type: actionTypes.GET_CHANNEL_LIST_SUCCESS,
  channels: channels
});

const getChannelListFailure = error => ({
  type: actionTypes.GET_CHANNEL_LIST_FAILURE,
  error: error
});

const getChannel = () => ({
  type: actionTypes.GET_CHANNEL
});

const getChannelSuccess = channel => ({
  type: actionTypes.GET_CHANNEL_SUCCESS,
  channel: channel
});

const getChannelFailure = error => ({
  type: actionTypes.GET_CHANNEL_FAILURE,
  error: error
});

const createChannel = () => ({
  type: actionTypes.CREATE_CHANNEL
});

const createChannelSuccess = () => ({
  type: actionTypes.CREATE_CHANNEL_SUCCESS
});

const createChannelFailure = error => ({
  type: actionTypes.CREATE_CHANNEL_FAILURE,
  error: error
});

const deleteChannel = () => ({
  type: actionTypes.DELETE_CHANNEL
});

const deleteChannelSuccess = () => ({
  type: actionTypes.DELETE_CHANNEL_SUCCESS
});

const deleteChannelFailure = error => ({
  type: actionTypes.DELETE_CHANNEL_FAILURE,
  error: error
});

const updateChannel = () => ({
  type: actionTypes.UPDATE_CHANNEL
});

const updateChannelSuccess = () => ({
  type: actionTypes.UPDATE_CHANNEL_SUCCESS
});

const updateChannelFailure = error => ({
  type: actionTypes.UPDATE_CHANNEL_FAILURE,
  error: error
});

export const getChannels = () => {
  return dispatch => {
    dispatch(getChannelList());
    channelsService.list(response => {
      if (response.status === 200) {
        dispatch(getChannelListSuccess(response.data));
      } else {
        dispatch(getChannelListFailure(response.data));
      }
    });
  };
};

export const getChannelByIdentifier = channelIdentifier => {
  return dispatch => {
    dispatch(getChannel());
    channelsService.getChannelByIdentifier(channelIdentifier, response => {
      if (response.status === 200) {
        dispatch(getChannelSuccess(response.data[0]));
      } else {
        dispatch(getChannelFailure(response.data));
      }
    });
  };
};

export const createNewChannel = (data, siteId, t, callback) => {
  return dispatch => {
    dispatch(createChannel());
    channelsService.addChannel(data, response => {
      if (response.status === 200) {
        callback("success");
        dispatch(createChannelSuccess(response.data));
        dispatch(actions.getSiteChannels(siteId));
        dispatch(actions.showNotification(t("notification.channel_added_success"), "success"));
      } else {
        dispatch(createChannelFailure(response.message));
        dispatch(actions.showNotification(t("notification.channel_added_error"), "error"));
      }
    });
  };
};

export const deleteChannelById = (channelId, siteId, t) => {
  return dispatch => {
    dispatch(deleteChannel());
    channelsService.deleteChannel(channelId, response => {
      if (response.status === 204) {
        dispatch(deleteChannelSuccess());
        dispatch(actions.getSiteChannels(siteId));
        dispatch(actions.showNotification(t("notification.channel_deleted_success"), "success"));
      } else {
        dispatch(deleteChannelFailure(response.message));
        dispatch(actions.showNotification(t("notification.channel_deleted_error"), "error"));
      }
    });
  };
};

export const updateChannelById = (channelId, siteId, data, t, callback) => {
  return dispatch => {
    dispatch(updateChannel());
    channelsService.updateChannel(channelId, data, response => {
      if (response.status === 204) {
        callback("success");
        dispatch(updateChannelSuccess(response.data));
        dispatch(actions.getSiteChannels(siteId));
        dispatch(actions.showNotification(t("notification.channel_updated_success"), "success"));
      } else {
        dispatch(updateChannelFailure(response.message));
        dispatch(actions.showNotification(t("notification.channel_updated_error"), "error"));
      }
    });
  };
};
