/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "shared/utility";

const initialState = {
  responses: [],
  loading: false,
  error: null,
  response: null
};

const createResponse = state => {
  return updateObject(state, { loading: true, error: null });
};

const createResponseSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, response: action.response });
};

const createResponseFailure = (state, action) => {
  return updateObject(state, { loading: false, error: action.error });
};

const responsesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_RESPONSE:
      return createResponse(state);

    case actionTypes.CREATE_RESPONSE_SUCCESS:
      return createResponseSuccess(state, action);

    case actionTypes.CREATE_RESPONSE_FAILURE:
      return createResponseFailure(state, action);

    default:
      return state;
  }
};

export default responsesReducer;
