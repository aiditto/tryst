/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";
import { authHeader } from "shared/utility";

const channelDemandsService = {
  list: (channelId, callback) => {
    Axios.get(API.channelDemands.get.replace(":id", channelId), {
      headers: authHeader()
    })
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

export default channelDemandsService;
