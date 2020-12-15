import * as actionTypes from "./actionTypes";
import wordpressService from "services/wp.service";

export const getNews = () => ({
  type: actionTypes.GET_NEWS
});

export const getNewsSuccess = news => ({
  type: actionTypes.GET_NEWS_SUCCESS,
  news: news
});

export const getNewsFailure = error => ({
  type: actionTypes.GET_NEWS_FAILURE,
  error: error
});

export const updateNewsFilter = filter => ({
  type: actionTypes.UPDATE_NEWS_FILTER,
  newsFilter: filter
});

export function getNewsFromWp(cityName) {
  return dispatch => {
    dispatch(getNews());
    wordpressService.news(cityName, response => {
      if (response.status === 200) {
        dispatch(getNewsSuccess(response.data.message));
      } else {
        dispatch(getNewsFailure(response.message));
      }
    });
  };
}
