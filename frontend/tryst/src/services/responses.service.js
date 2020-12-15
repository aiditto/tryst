/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";

const responsesService = {
  addResponse: (data, callback) => {
    Axios.post(API.responses.create, data, {})
      .then(response => {
        if (response.data) {
          callback(response);
        }
      })
      .catch(error => {
        callback(error);
      });
  }
};

export default responsesService;
