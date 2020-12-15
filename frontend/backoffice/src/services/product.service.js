/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";
import { authHeader } from "shared/utility";

const productService = {
  publicList: callback => {
    Axios.get(API.product.publicList, {})
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
    Axios.get(API.product.list, {
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
  addProduct: (data, callback) => {
    Axios.post(API.product.create, data, {
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
  deleteProduct: (productId, callback) => {
    Axios.delete(API.product.delete.replace(":id", productId), {
      headers: authHeader()
    })
      .then(response => {
        callback(response);
      })
      .catch(error => {
        callback(error);
      });
  },
  getProduct: (productId, callback) => {
    Axios.get(API.product.get.replace(":id", productId), {
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
  updateProduct: (productId, data, callback) => {
    data["id"] = productId;
    Axios.put(API.product.update, data, {
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

export default productService;
