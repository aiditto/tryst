import Cookies from "js-cookie";
import moment from "moment";

export const updateObject = (previousObject, updatedProperties) => {
  return {
    ...previousObject,
    ...updatedProperties
  };
};

export const authHeader = () => {
  // return authorization header with jwt token
  const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
};

export const inviteHeader = () => {
  // return authorization header with jwt token
  const token = sessionStorage.getItem(ADMIN_TOKEN_KEY);
  if (token) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
};

export const isUserValidated = history => {
  let userValidated = false;
  const cookie_token = Cookies.get(SESSION_TOKEN_KEY);
  const cookie_exp = Cookies.get(SESSION_TOKEN_EXPIRATION_DATE_KEY);
  if (cookie_token && cookie_exp) {
    setSession(cookie_token, cookie_exp);
    checkAuthTimeout(history, cookie_exp);
    userValidated = true;
  }
  return userValidated;
};

export const isAdminAuthorized = () => {
  let adminAuthorized = false;
  const cookie_token = Cookies.get(ADMIN_TOKEN_KEY);
  const cookie_exp = Cookies.get(ADMIN_TOKEN_EXPIRATION_DATE_KEY);
  if (cookie_token && cookie_exp) {
    setAdminSession(cookie_token, cookie_exp);
    adminAuthorized = true;
  }
  return adminAuthorized;
};

export const setSession = (token, expireDate) => {
  const expirationDate = moment.unix(expireDate).format("LLLL");
  sessionStorage.setItem(SESSION_TOKEN_KEY, token);
  sessionStorage.setItem(SESSION_TOKEN_EXPIRATION_DATE_KEY, expirationDate);
};

export const setAdminSession = (token, expireIn) => {
  const expirationDate = moment()
    .add(expireIn, "seconds")
    .format("LLLL");
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token);
  sessionStorage.setItem(ADMIN_TOKEN_EXPIRATION_DATE_KEY, expirationDate);
};

export const removeSession = () => {
  sessionStorage.removeItem(SESSION_TOKEN_KEY);
  sessionStorage.removeItem(SESSION_TOKEN_EXPIRATION_DATE_KEY);
  sessionStorage.removeItem(ADMIN_TOKEN_KEY);
  sessionStorage.removeItem(ADMIN_TOKEN_EXPIRATION_DATE_KEY);
};

export const isSessionValid = () => {
  const token = sessionStorage.getItem(SESSION_TOKEN_KEY);
  return token && moment().unix() <= moment(sessionStorage.getItem(SESSION_TOKEN_EXPIRATION_DATE_KEY)).unix();
};

export const isAdminSessionValid = () => {
  const token = sessionStorage.getItem(ADMIN_TOKEN_KEY);
  return token && moment().unix() <= moment(sessionStorage.getItem(ADMIN_TOKEN_EXPIRATION_DATE_KEY)).unix();
};

export const checkAuthTimeout = (history, expiration) => {
  const expirationTime = expiration - moment().unix();
  setTimeout(() => {
    removeSession();
    history.push("/", { sessionExpired: true });
  }, expirationTime * 1000);
};

export const getSiteUrl = identifier => {
  let completeUrl = "";
  const protocol = "https://";
  const domain = process.env.REACT_APP_SITE_DOMAIN ?? `${window.location.protocol}//${window.location.host}`;
  completeUrl = `${domain}/${identifier}`;
  return completeUrl;
};

export const getStaticUrl = identifier => {
  let completeUrl = "";
  const protocol = "https://";
  const domain = process.env.REACT_APP_SITE_DOMAIN;
  completeUrl = `${protocol}${domain}/`;
  return completeUrl;
};

export const parseDate = date => {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("/");
};

export const verifyEmail = value => {
  let emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(value)) {
    return true;
  }
  return false;
};

export const verifyTelefon = value => {
  var telefonRex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}$/im;
  return telefonRex.test(value);
};

export const SESSION_TOKEN_KEY = "session-token";
export const SESSION_TOKEN_EXPIRATION_DATE_KEY = "session-exp";
export const ADMIN_TOKEN_KEY = "admin-token";
export const ADMIN_TOKEN_EXPIRATION_DATE_KEY = "admin-exp";

// default to same domain as client, unless overriden by env variable
export const BASE_URL =
  process.env.REACT_APP_BASE_URL_BACKEND ?? `${window.location.protocol}//${window.location.host}`;

export const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY;
export const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

export const SECTION_KEYS = {
  HEADER: "Header",
  TEXT_SECTION: "Text section",
  BUTTON_GROUP: "Button group",
  ABOUT_US: "About us",
  FORM_SECTION: "Form section",
  LIST_SECTION: "List section"
};

export const DEMAND_FIELDS = {
  ORGANIZATION_NUMBER: "Organization Number",
  ADDRESS: "Address",
  FIRST_NAME: "First name",
  LAST_NAME: "Last name",
  EMAIL: "Email",
  PHONE_NUMBER: "Phone number",
  ADDITIONAL_INFORMATION: "Additional information"
};
