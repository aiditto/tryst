/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";
import { authHeader } from "shared/utility";
export const SESSION_TOKEN_KEY = "session-token";
export const SESSION_TOKEN_EXPIRATION_DATE_KEY = "session-expiration-date";
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
  login: (email, password, callback) => {
    Axios.post(API.auth.login, {
      email: email,
      password: password
    })
      .then(response => {
        const expirationDate = new Date(response.data.expiresAt);
        sessionStorage.setItem(SESSION_TOKEN_KEY, response.data.token);
        sessionStorage.setItem(SESSION_TOKEN_EXPIRATION_DATE_KEY, expirationDate);
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
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
  getSessionToken: () => {
    return sessionStorage.getItem(SESSION_TOKEN_KEY);
  },
  isAuthenticated: () => {
    const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
    return (
      token && new Date().getTime() <= new Date(sessionStorage.getItem(SESSION_TOKEN_EXPIRATION_DATE_KEY)).getTime()
    );
  },
  removeToken: () => {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
  },
  logout: () => {
    sessionStorage.removeItem(SESSION_TOKEN_KEY);
    sessionStorage.removeItem(SESSION_TOKEN_EXPIRATION_DATE_KEY);
    window.location.href = "/login";
  }
};

export default authenticationService;
