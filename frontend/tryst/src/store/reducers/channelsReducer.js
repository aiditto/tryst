/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  channels: [],
  loading: false,
  error: null,
  channel: null
};

const getChannelList = state => {
  return updateObject(state, { loading: true, error: null });
};

const getChannelListSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, channels: action.channels });
};

const getChannelListFailure = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    channels: []
  });
};

const getChannel = state => {
  return updateObject(state, { loading: true, error: null });
};

const getChannelSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, channel: action.channel });
};

const getChannelFailure = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    channel: null
  });
};

const createChannel = state => {
  return updateObject(state, { loading: true, error: null });
};

const createChannelSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, action: action.channel });
};

const createChannelFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const deleteChannel = state => {
  return updateObject(state, { loading: true, error: null });
};

const deleteChannelSuccess = state => {
  return updateObject(state, { loading: false, error: null });
};

const deleteChannelFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const updateChannel = state => {
  return updateObject(state, { loading: true, error: null });
};

const updateChannelSuccess = state => {
  return updateObject(state, { loading: false, error: null });
};

const updateChannelFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CHANNEL_LIST:
      return getChannelList(state);

    case actionTypes.GET_CHANNEL_LIST_SUCCESS:
      return getChannelListSuccess(state, action);

    case actionTypes.GET_CHANNEL_LIST_FAILURE:
      return getChannelListFailure(state, action);

    case actionTypes.GET_CHANNEL:
      return getChannel(state);

    case actionTypes.GET_CHANNEL_SUCCESS:
      return getChannelSuccess(state, action);

    case actionTypes.GET_CHANNEL_FAILURE:
      return getChannelFailure(state, action);

    case actionTypes.CREATE_CHANNEL:
      return createChannel(state);

    case actionTypes.CREATE_CHANNEL_SUCCESS:
      return createChannelSuccess(state, action);

    case actionTypes.CREATE_CHANNEL_FAILURE:
      return createChannelFailure(state, action);

    case actionTypes.DELETE_CHANNEL:
      return deleteChannel(state);

    case actionTypes.DELETE_CHANNEL_SUCCESS:
      return deleteChannelSuccess(state);

    case actionTypes.DELETE_CHANNEL_FAILURE:
      return deleteChannelFailure(state, action);

    case actionTypes.UPDATE_CHANNEL:
      return updateChannel(state);

    case actionTypes.UPDATE_CHANNEL_SUCCESS:
      return updateChannelSuccess(state);

    case actionTypes.UPDATE_CHANNEL_FAILURE:
      return updateChannelFailure(state, action);

    default:
      return state;
  }
};

export default channelsReducer;
