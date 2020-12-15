/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";
import { authHeader } from "shared/utility";

const demandService = {
  shortList: callback => {
    Axios.get(API.demand.shortlist, {})
      .then(response => {
        if (response.data && response.data.message) {
          callback(response);
        }
      })
      .catch(error => {
        callback(error);
      });
  },
  list: callback => {
    Axios.get(API.demand.list, {
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
  },
  pageList: (page, items, callback) => {
    Axios.get(API.demand.pageList, {
      headers: authHeader(),
      params: {
        page: page,
        items: items
      }
    })
      .then(response => {
        if (response.data && response.data.message) {
          callback(response);
        }
      })
      .catch(error => {
        callback(error);
      });
  },
  addDemand: (data, callback) => {
    Axios.post(API.demand.create, data, {
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
  },
  deleteDemand: (demandId, callback) => {
    Axios.delete(API.demand.delete.replace(":id", demandId), {
      headers: authHeader()
    })
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  },
  getDemand: (demandId, callback) => {
    Axios.get(API.demand.get.replace(":id", demandId), {
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
  },
  getTotalCount: callback => {
    Axios.get(API.demand.count, {
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
  },
  updateDemand: (demandId, data, callback) => {
    data["id"] = demandId;

    Axios.put(API.demand.update, data, {
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
  },
  updateDemandBatch: (data, callback) => {
    Axios.put(API.demand.batch, data, {
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

export default demandService;
