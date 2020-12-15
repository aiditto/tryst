/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";
import { authHeader } from "shared/utility";

const modelService = {
  list: callback => {
    Axios.get(API.model.list, {
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
  addModel: (data, callback) => {
    Axios.post(API.model.create, data, {
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
  deleteModel: (modelId, callback) => {
    Axios.delete(API.model.delete.replace(":id", modelId), {
      headers: authHeader()
    })
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  },
  getModel: (modelId, callback) => {
    Axios.get(API.model.get.replace(":id", modelId), {
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
  updateModel: (modelId, data, callback) => {
    data["id"] = modelId;
    Axios.put(API.model.update, data, {
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

export default modelService;
