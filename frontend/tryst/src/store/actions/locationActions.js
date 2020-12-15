import * as actionTypes from "./actionTypes";
import locationService from "services/location.service";

const getSwedishCitiesSuccess = swedishCities => async dispatch => {
  return dispatch({
    type: actionTypes.GET_SWEDISH_CITIES_SUCCESS,
    swedishCities: swedishCities
  });
};

const getSwedishCitiesFailure = error => async dispatch => {
  return dispatch({
    type: actionTypes.GET_SWEDISH_CITIES_SUCCESS,
    error: error
  });
};

export const getSweCities = () => {
  return dispatch => {
    locationService.getSwedishCities(response => {
      if (response.status === 200) {
        dispatch(getSwedishCitiesSuccess(response.data.message));
      } else {
        dispatch(getSwedishCitiesFailure(response.message));
      }
    });
  };
};
