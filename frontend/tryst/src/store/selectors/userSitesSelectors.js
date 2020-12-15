import { createSelector } from "reselect";

const getRoot = store => store.userSites;

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

export const USERSITES_SELECTORS = {
  getLoading,
  getError,
  getSites
};
