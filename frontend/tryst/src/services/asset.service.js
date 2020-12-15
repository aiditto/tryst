/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";
import { authHeader } from "shared/utility";

const assetService = {
  list: callback => {
    Axios.get(API.asset.list, {
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
  listByUser: callback => {
    Axios.get(API.asset.listByUser, {
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
    Axios.get(API.asset.pageList, {
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
  addAsset: (data, callback) => {
    Axios.post(API.asset.create, data, {
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
  deleteAsset: (assetId, callback) => {
    Axios.delete(API.asset.delete.replace(":id", assetId), {
      headers: authHeader()
    })
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  },
  getAsset: (assetId, callback) => {
    Axios.get(API.asset.get.replace(":id", assetId), {
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
    Axios.get(API.asset.count, {
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
  updateAsset: (assetId, data, callback) => {
    data["id"] = 3;
    Axios.put(API.asset.update, data, {
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
  updateAssetBatch: (data, callback) => {
    Axios.put(API.asset.batch, data, {
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

export default assetService;
