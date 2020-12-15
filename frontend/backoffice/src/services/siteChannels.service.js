/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";
import { authHeader } from "shared/utility";

const siteChannelsService = {
  list: (siteId, callback) => {
    Axios.get(API.siteChannels.get.replace(":id", siteId), {
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
  },

  patch: (siteId, data, callback) => {
    Axios.patch(API.siteChannels.patch.replace(":id", siteId), data, {
      headers: authHeader()
    })
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  }
};

export default siteChannelsService;
