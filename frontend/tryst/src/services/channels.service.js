/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";
import { authHeader } from "shared/utility";

const channelsService = {
  list: callback => {
    Axios.get(API.channels.list, {
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
  getChannelByIdentifier: (identifier, callback) => {
    Axios.get(API.channels.list, {
      params: {
        "filter[where][identifier]": identifier
      }
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
  addChannel: (data, callback) => {
    Axios.post(API.channels.create, data, {
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
  deleteChannel: (channelId, callback) => {
    Axios.delete(API.channels.delete.replace(":id", channelId), {
      headers: authHeader()
    })
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  },
  updateChannel: (channelId, data, callback) => {
    Axios.put(API.channels.update.replace(":id", channelId), data, {
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

export default channelsService;
