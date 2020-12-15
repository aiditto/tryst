/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "shared/utility";

const initialState = {
  channels: [],
  loading: false,
  error: null
};

const getSiteChannelList = state => {
  return updateObject(state, { loading: true, error: null });
};

const getSiteChannelListSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, channels: action.channels });
};

const getSiteChannelListFailure = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    channels: []
  });
};

const siteChannelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SITE_CHANNEL_LIST:
      return getSiteChannelList(state);

    case actionTypes.GET_SITE_CHANNEL_LIST_SUCCESS:
      return getSiteChannelListSuccess(state, action);

    case actionTypes.GET_SITE_CHANNEL_LIST_FAILURE:
      return getSiteChannelListFailure(state, action);

    default:
      return state;
  }
};

export default siteChannelsReducer;
