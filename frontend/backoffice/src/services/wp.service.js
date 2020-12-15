/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
import { API, Axios } from "api";
const wordpressService = {
  getPageInfo: (instance, slug, callback) => {
    Axios.get(API.wp.page_info, {
      params: {
        instance: instance,
        slug: slug
      }
    })
      .then(response => {
        if (response && response.data) {
          callback(response);
        }
      })
      .catch(error => {
        callback(error);
      });
  },
  getItemInfo: (instance, id, callback) => {
    Axios.get(API.wp.item_info, {
      params: {
        instance: instance,
        id: id + "-2"
      }
    })
      .then(response => {
        if (response && response.data) {
          callback(response);
        }
      })
      .catch(error => {
        callback(error);
      });
  },
  news: (category, callback) => {
    Axios.get(API.wp.news, {
      params: {
        category: category
      }
    })
      .then(response => {
        if (response && response.data) {
          callback(response);
        }
      })
      .catch(error => {
        callback(error);
      });
  }
};

export default wordpressService;
