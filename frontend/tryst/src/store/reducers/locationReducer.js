/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  swedishCities: [],
  error: null
};

const getSwedishCities = (state, action) => {
  return updateObject(state, { ...state, swedishCities: action.swedishCities });
};

const getSwedishCitiesFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
    swedishCities: []
  });
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SWEDISH_CITIES_SUCCESS:
      return getSwedishCities(state, action);

    case actionTypes.GET_SWEDISH_CITIES_FAILURE:
      return getSwedishCitiesFailure(state, action);

    default:
      return state;
  }
};

export default locationReducer;
