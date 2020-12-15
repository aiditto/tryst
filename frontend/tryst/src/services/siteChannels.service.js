/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";
import { authHeader } from "shared/utility";

const siteChannelsService = {
  list: (siteId, callback) => {
    Axios.get(API.siteChannels.get.replace(":id", siteId), {})
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

export default siteChannelsService;
