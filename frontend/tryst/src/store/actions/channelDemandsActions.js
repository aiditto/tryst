import * as actionTypes from "./actionTypes";
import channelDemandsService from "services/channelDemands.service";

const getChannelDemandList = () => ({
  type: actionTypes.GET_CHANNEL_DEMAND_LIST
});

const getChannelDemandListSuccess = demands => ({
  type: actionTypes.GET_CHANNEL_DEMAND_LIST_SUCCESS,
  demands: demands
});

const getChannelDemandListFailure = error => ({
  type: actionTypes.GET_CHANNEL_DEMAND_LIST_FAILURE,
  error: error
});

export const getChannelDemands = channelId => {
  return dispatch => {
    dispatch(getChannelDemandList());
    channelDemandsService.list(channelId, response => {
      if (response.status === 200) {
        dispatch(getChannelDemandListSuccess(response.data));
      } else {
        dispatch(getChannelDemandListFailure(response.data));
      }
    });
  };
};
