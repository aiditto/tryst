import { createSelector } from "reselect";

const getRoot = store => store.auth;

export const getToken = createSelector(
  getRoot,
  state => state.token
);

export const getLoading = createSelector(
  getRoot,
  state => state.loading
);

export const getError = createSelector(
  getRoot,
  state => state.error
);

export const getUser = createSelector(
  getRoot,
  state => state.user
);

export const AUTH_SELECTORS = {
  getError,
  getLoading,
  getToken,
  getUser
};
