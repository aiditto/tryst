/* eslint-disable no-unused-vars */
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  news: [],
  loading: false,
  error: null,
  newsFilter: ""
};

const getNews = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const getNewsSuccess = (state, action) => {
  return updateObject(state, { loading: false, error: null, news: action.news });
};

const getNewsFailure = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
    news: []
  });
};

const updatedNewsFilter = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    newsFilter: action.newsFilter
  });
};

const wordpressReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_NEWS:
      return getNews(state, action);

    case actionTypes.GET_NEWS_SUCCESS:
      return getNewsSuccess(state, action);

    case actionTypes.GET_NEWS_FAILURE:
      return getNewsFailure(state, action);

    case actionTypes.UPDATE_NEWS_FILTER:
      return updatedNewsFilter(state, action);

    default:
      return state;
  }
};

export default wordpressReducer;
