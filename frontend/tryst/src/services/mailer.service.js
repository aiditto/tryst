/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";
import { authHeader } from "shared/utility";

const mailerService = {
  connectedAssets: (assetIDs, callback) => {
    Axios.post(API.mailer.connectedAssets, assetIDs, {
      headers: authHeader()
    })
      .then(response => {
        if (response.data && response.data.message) {
          callback(response);
        }
      })
      .catch(error => {
        callback(error);
      });
  }
};

export default mailerService;
