/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";
import { authHeader, inviteHeader, setSession, removeSession, isSessionValid, BASE_URL } from "shared/utility";

const authenticationService = {
  signup: data => {
    Axios.post(API.auth.signup, data)
      .then(_response => {
        window.location.href = "/login";
      })
      .catch(error => {
        console.log(error);
      });
  },
  sso: () => {
    window.location.href = BASE_URL + API.auth.sso;
  },
  authorizeAdmin: () => {
    window.location.href = BASE_URL + API.auth.admin;
  },
  getUser: callback => {
    Axios.get(API.auth.user, {
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
  inviteUser: (data, siteId, callback) => {
    console.log(data);
    data["siteId"] = siteId;
    Axios.post(API.auth.invite, data, {
      headers: inviteHeader()
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
  isAuthenticated: () => {
    return isSessionValid();
  },
  logout: history => {
    removeSession();
    history.push("/", { logout: true });
  }
};

export default authenticationService;
