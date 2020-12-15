import { createSelector } from "reselect";

const getRoot = store => store.sites;

export const getSites = createSelector(
  getRoot,
  state => state.sites
);

export const getLoading = createSelector(
  getRoot,
  state => state.loading
);

export const getError = createSelector(
  getRoot,
  state => state.error
);

export const getSite = createSelector(
  getRoot,
  state => state.site
);

export const SITES_SELECTORS = {
  getLoading,
  getError,
  getSites,
  getSite
};
