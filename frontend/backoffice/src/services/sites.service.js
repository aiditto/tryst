/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";
import { authHeader } from "shared/utility";

const sitesService = {
  list: callback => {
    Axios.get(API.sites.list, {})
      .then(response => {
        if (response.data) {
          callback(response);
        }
      })
      .catch(error => {
        callback(error);
      });
  },
  getSiteByIdentifier: (identifier, callback) => {
    Axios.get(API.sites.list, {
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
  getSiteById: (siteId, callback) => {
    Axios.get(API.sites.get.replace(":id", siteId), {})
      .then(response => {
        if (response.data) {
          callback(response);
        }
      })
      .catch(error => {
        callback(error);
      });
  },
  addSite: (data, callback) => {
    Axios.post(API.sites.create, data, {
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
  deleteSite: (siteId, callback) => {
    Axios.delete(API.sites.delete.replace(":id", siteId), {
      headers: authHeader()
    })
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  },
  updateSite: (siteId, data, callback) => {
    Axios.put(API.sites.update.replace(":id", siteId), data, {
      headers: authHeader()
    })
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  },
  patchSite: (siteId, data, callback) => {
    Axios.patch(API.sites.patch.replace(":id", siteId), data, {
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

export default sitesService;
