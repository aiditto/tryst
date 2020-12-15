/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";
import { authHeader } from "shared/utility";

const demandsService = {
  list: callback => {
    Axios.get(API.demands.list, {})
      .then(response => {
        if (response.data) {
          callback(response);
        }
      })
      .catch(error => {
        callback(error);
      });
  },
  getDemandByIdentifier: (identifier, callback) => {
    Axios.get(API.demands.list, {
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
  addDemand: (data, callback) => {
    Axios.post(API.demands.create, data, {
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
  deleteDemand: (demandId, callback) => {
    Axios.delete(API.demands.delete.replace(":id", demandId), {
      headers: authHeader()
    })
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  },
  updateDemand: (demandId, data, callback) => {
    Axios.put(API.demands.update.replace(":id", demandId), data, {
      headers: authHeader()
    })
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  },
  getDemandById: (demandId, callback) => {
    Axios.get(API.demands.get.replace(":id", demandId), {})
      .then(response => {
        if (response.data) {
          callback(response);
        }
      })
      .catch(error => {
        callback(error);
      });
  },
  patchDemand: (demandId, data, callback) => {
    Axios.patch(API.demands.patch.replace(":id", demandId), data, {
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

export default demandsService;
