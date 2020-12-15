import * as actionTypes from "./actionTypes";
import responsesService from "services/responses.service";
import * as actions from "./rootAction";

const createResponse = () => ({
  type: actionTypes.CREATE_RESPONSE
});

const createResponseSuccess = response => ({
  type: actionTypes.CREATE_RESPONSE_SUCCESS,
  response: response
});

const createResponseFailure = error => ({
  type: actionTypes.CREATE_RESPONSE_FAILURE,
  error: error
});

export const createNewResponse = (data, t, callback) => {
  return dispatch => {
    dispatch(createResponse());
    responsesService.addResponse(data, response => {
      if (response.status === 200) {
        callback("success");
        dispatch(createResponseSuccess(response.data));
        dispatch(actions.showNotification(t("notification.response_added_success"), "success"));
      } else {
        dispatch(createResponseFailure(response.message));
        dispatch(actions.showNotification(t("notification.response_added_error"), "error"));
      }
    });
  };
};
