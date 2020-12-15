/* import Cookies from "js-cookie";
import moment from "moment"; */

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

export const getSiteUrl = identifier => {
  let completeUrl = "";
  // use whatever client domain is currently in use
  const protocol = window.location.protocol;
  const domain = window.location.host;
  completeUrl = `${protocol}//${domain}/${identifier}`;
  return completeUrl;
};

export const getSiteIdentifier = url => {
  // We have to change this in order to work with the new infrastructure later
  let splittedUrl = url.split("//")[1].split("/");
  return splittedUrl[1];
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

export function verifyOrgNumber(orgNumber, callback) {
  const axios = require("axios").default;
  const url = `https://cors-anywhere.herokuapp.com/https://www.ratsit.se/${orgNumber}`;
  axios.get(url).then(res => {
    if (res.data.includes("ForetagrapportFinnsEj")) {
      callback("finns ej");
    } else {
      callback(null, res);
    }
  });
}

export const checkSessionData = () => {
  let data = sessionStorage.getItem(SESSION_DATA_KEY);
  let sessionExists;
  if (data) {
    sessionExists = true;
  } else {
    const value = { organizationNumber: "", address: "", information: "" };
    data = sessionStorage.setItem(SESSION_DATA_KEY, JSON.stringify(value)); // "RANDOMIZED (?) SESSION TOKEN"; // Need to randomize or whatever to keep track of each users session
    sessionExists = false;
  }
  return sessionExists;
};

export const updateSessionData = data => {
  let prevData = JSON.parse(sessionStorage.getItem(SESSION_DATA_KEY));
  Object.keys(data).forEach(function(val) {
    prevData[val] = data[val];
  });
  sessionStorage.setItem(SESSION_DATA_KEY, JSON.stringify(prevData));
};

export const getSessionData = () => {
  return JSON.parse(sessionStorage.getItem(SESSION_DATA_KEY));
};
/* {session-key: blabla,
session-data: {
  orgnumber: 123,
  info: "this is info"
}
} */
/*
export const loadCurrentData = () => {
  if (checkCurrentSession()) {
    // load data from current session
    return Cookies.get("demand_data", Cookies.get(SESSION_TOKEN_KEY));
  } else {
    return null;
  }
}; */

export const verifyEmail = value => {
  let emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRex.test(value)) {
    return true;
  }
  return false;
};

export const verifyTelephone = value => {
  var telefonRex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{3,6}$/im;
  return telefonRex.test(value);
};

export const SESSION_DATA_KEY = "session-data";
export const SESSION_TOKEN_KEY = "session-token";
export const SESSION_TOKEN_EXPIRATION_DATE_KEY = "session-exp";

// default to same domain as client, unless overriden by env variable
// TODO Rename to API_URL
export const BASE_URL = process.env.REACT_APP_API_URL ?? `${window.location.protocol}//${window.location.host}`;
delete process.env.REACT_APP_API_URL;

export const FALLBACK_PRIMARY_COLOR = "#262E42";
export const FALLBACK_SECONDARY_COLOR = "#E15657";

export const DEMAND_FIELDS = {
  ORGANIZATION_NUMBER: "Organization Number",
  ADDRESS: "Address",
  FIRST_NAME: "First name",
  LAST_NAME: "Last name",
  EMAIL: "Email",
  PHONE_NUMBER: "Phone number",
  ADDITIONAL_INFORMATION: "Additional information"
};
