/* eslint-disable no-unused-vars */
/* eslint-disable react/react-in-jsx-scope */
//import { API, Axios } from "api";
import axios from "axios";
import { ACCESS_KEY } from "shared/utility";

const BASE_URL = "https://api.unsplash.com";
const searchImages = BASE_URL + "/search/photos";
const CLIENT_ID = ACCESS_KEY;

const imageLoaderService = {
  searchImage: (searchQuery, callback) => {
    axios
      .get(searchImages, {
        params: {
          query: searchQuery,
          per_page: 60,
        },
        headers: {
          Authorization: `Client-ID ${CLIENT_ID}`,
        },
      })
      .then((response) => {
        if (response && response.data) {
          callback(response);
        }
      })
      .catch((err) => {
        callback(err);
      });
  },
};

export default imageLoaderService;
