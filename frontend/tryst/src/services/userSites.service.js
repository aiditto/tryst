/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";
import { authHeader } from "shared/utility";

const userSitesService = {
  list: (userId, callback) => {
    Axios.get(API.userSites.get.replace(":id", userId), {
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

export default userSitesService;
