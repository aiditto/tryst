/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  demands: [],
  loading: false,
  error: null,
  demand: null
};

const getDemandList = state => {
  return updateObject(state, { loading: true, error: null });
};

const getDemandListSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, demands: action.demands });
};

const getDemandListFailure = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    demands: []
  });
};

const createDemand = state => {
  return updateObject(state, { loading: true, error: null });
};

const createDemandSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, demand: action.demand });
};

const createDemandFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const deleteDemand = state => {
  return updateObject(state, { loading: true, error: null });
};

const deleteDemandSuccess = state => {
  return updateObject(state, { loading: false, error: null });
};

const deleteDemandFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const updateDemand = state => {
  return updateObject(state, { loading: true, error: null });
};

const updateDemandSuccess = state => {
  return updateObject(state, { loading: false, error: null });
};

const updateDemandFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const patchDemand = state => {
  return updateObject(state, { loading: true, error: null });
};

const patchDemandSuccess = state => {
  return updateObject(state, { loading: false, error: null });
};

const patchDemandFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const getDemand = state => {
  return updateObject(state, { loading: true, error: null });
};

const getDemandSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, demand: action.demand });
};

const getDemandFailure = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    demand: null
  });
};

const demandsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_DEMAND_LIST:
      return getDemandList(state);

    case actionTypes.GET_DEMAND_LIST_SUCCESS:
      return getDemandListSuccess(state, action);

    case actionTypes.GET_DEMAND_LIST_FAILURE:
      return getDemandListFailure(state, action);

    case actionTypes.CREATE_DEMAND:
      return createDemand(state);

    case actionTypes.CREATE_DEMAND_SUCCESS:
      return createDemandSuccess(state, action);

    case actionTypes.CREATE_DEMAND_FAILURE:
      return createDemandFailure(state, action);

    case actionTypes.DELETE_DEMAND:
      return deleteDemand(state);

    case actionTypes.DELETE_DEMAND_SUCCESS:
      return deleteDemandSuccess(state);

    case actionTypes.DELETE_DEMAND_FAILURE:
      return deleteDemandFailure(state, action);

    case actionTypes.UPDATE_DEMAND:
      return updateDemand(state);

    case actionTypes.UPDATE_DEMAND_SUCCESS:
      return updateDemandSuccess(state);

    case actionTypes.UPDATE_DEMAND_FAILURE:
      return updateDemandFailure(state, action);

    case actionTypes.PATCH_DEMAND:
      return patchDemand(state);

    case actionTypes.PATCH_DEMAND_SUCCESS:
      return patchDemandSuccess(state);

    case actionTypes.PATCH_DEMAND_FAILURE:
      return patchDemandFailure(state, action);

    case actionTypes.GET_DEMAND:
      return getDemand(state);

    case actionTypes.GET_DEMAND_SUCCESS:
      return getDemandSuccess(state, action);

    case actionTypes.GET_DEMAND_FAILURE:
      return getDemandFailure(state, action);

    default:
      return state;
  }
};

export default demandsReducer;
