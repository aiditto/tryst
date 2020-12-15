import { createSelector } from "reselect";

const getRoot = store => store.wp;

export const getNews = createSelector(
  getRoot,
  state => state.news
);

export const getNewsFilter = createSelector(
  getRoot,
  state => state.newsFilter
);

export const getLoading = createSelector(
  getRoot,
  state => state.loading
);

export const getError = createSelector(
  getRoot,
  state => state.error
);

export const WORDPRESS_SELECTORS = {
  getLoading,
  getError,
  getNews,
  getNewsFilter
};
