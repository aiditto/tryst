/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  demands: [],
  loading: false,
  error: null
};

const getChannelDemandList = state => {
  return updateObject(state, { loading: true, error: null });
};

const getChannelDemandListSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, demands: action.demands });
};

const getChannelDemandListFailure = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    demands: []
  });
};

const patchChannelDemandList = state => {
  return updateObject(state, { loading: true, error: null });
};

const patchChannelDemandListSuccess = state => {
  return updateObject(state, { loading: false, error: null });
};

const patchChannelDemandListFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const channelDemandsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CHANNEL_DEMAND_LIST:
      return getChannelDemandList(state);

    case actionTypes.GET_CHANNEL_DEMAND_LIST_SUCCESS:
      return getChannelDemandListSuccess(state, action);

    case actionTypes.GET_CHANNEL_DEMAND_LIST_FAILURE:
      return getChannelDemandListFailure(state, action);

    case actionTypes.PATCH_CHANNEL_DEMAND_LIST:
      return patchChannelDemandList(state);

    case actionTypes.PATCH_CHANNEL_DEMAND_LIST_SUCCESS:
      return patchChannelDemandListSuccess(state);

    case actionTypes.PATCH_CHANNEL_DEMAND_LIST_FAILURE:
      return patchChannelDemandListFailure(state, action);

    default:
      return state;
  }
};

export default channelDemandsReducer;
