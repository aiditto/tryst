import * as actionTypes from "./actionTypes";
import demandsService from "services/demands.service";
import * as actions from "./rootAction";

const getDemandList = () => ({
  type: actionTypes.GET_DEMAND_LIST
});

const getDemandListSuccess = demands => ({
  type: actionTypes.GET_DEMAND_LIST_SUCCESS,
  demands: demands
});

const getDemandListFailure = error => ({
  type: actionTypes.GET_DEMAND_LIST_FAILURE,
  error: error
});

const getDemand = () => ({
  type: actionTypes.GET_DEMAND
});

const getDemandSuccess = demand => ({
  type: actionTypes.GET_DEMAND_SUCCESS,
  demand: demand
});

const getDemandFailure = error => ({
  type: actionTypes.GET_DEMAND_FAILURE,
  error: error
});

const createDemand = () => ({
  type: actionTypes.CREATE_DEMAND
});

const createDemandSuccess = () => ({
  type: actionTypes.CREATE_DEMAND_SUCCESS
});

const createDemandFailure = error => ({
  type: actionTypes.CREATE_DEMAND_FAILURE,
  error: error
});

const deleteDemand = () => ({
  type: actionTypes.DELETE_DEMAND
});

const deleteDemandSuccess = () => ({
  type: actionTypes.DELETE_DEMAND_SUCCESS
});

const deleteDemandFailure = error => ({
  type: actionTypes.DELETE_DEMAND_FAILURE,
  error: error
});

const updateDemand = () => ({
  type: actionTypes.UPDATE_DEMAND
});

const updateDemandSuccess = () => ({
  type: actionTypes.UPDATE_DEMAND_SUCCESS
});

const updateDemandFailure = error => ({
  type: actionTypes.UPDATE_DEMAND_FAILURE,
  error: error
});

export const getDemands = () => {
  return dispatch => {
    dispatch(getDemandList());
    demandsService.list(response => {
      if (response.status === 200) {
        dispatch(getDemandListSuccess(response.data));
      } else {
        dispatch(getDemandListFailure(response.data));
      }
    });
  };
};

export const getDemandByIdentifier = demandIdentifier => {
  return dispatch => {
    dispatch(getDemand());
    demandsService.getDemandByIdentifier(demandIdentifier, response => {
      if (response.status === 200) {
        dispatch(getDemandSuccess(response.data[0]));
      } else {
        dispatch(getDemandFailure(response.data));
      }
    });
  };
};

export const createNewDemand = (data, channelId, t, callback) => {
  return dispatch => {
    dispatch(createDemand());
    demandsService.addDemand(data, response => {
      if (response.status === 200) {
        callback("success");
        dispatch(createDemandSuccess(response.data));
        dispatch(actions.getChannelDemands(channelId));
        dispatch(actions.showNotification(t("notification.demand_added_success"), "success"));
      } else {
        dispatch(createDemandFailure(response.message));
        dispatch(actions.showNotification(t("notification.demand_added_error"), "error"));
      }
    });
  };
};

export const deleteDemandById = (demandId, channelId, t) => {
  return dispatch => {
    dispatch(deleteDemand());
    demandsService.deleteDemand(demandId, response => {
      if (response.status === 204) {
        dispatch(deleteDemandSuccess());
        dispatch(actions.getChannelDemands(channelId));
        dispatch(actions.showNotification(t("notification.demand_deleted_success"), "success"));
      } else {
        dispatch(deleteDemandFailure(response.message));
        dispatch(actions.showNotification(t("notification.demand_deleted_error"), "error"));
      }
    });
  };
};

export const updateDemandById = (demandId, channelId, data, t, callback) => {
  return dispatch => {
    dispatch(updateDemand());
    demandsService.updateDemand(demandId, data, response => {
      if (response.status === 204) {
        callback("success");
        dispatch(updateDemandSuccess(response.data));
        dispatch(actions.getChannelDemands(channelId));
        dispatch(actions.showNotification(t("notification.demand_updated_success"), "success"));
      } else {
        dispatch(updateDemandFailure(response.message));
        dispatch(actions.showNotification(t("notification.demand_updated_error"), "error"));
      }
    });
  };
};
