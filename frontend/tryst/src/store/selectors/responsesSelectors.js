import { createSelector } from "reselect";

const getRoot = store => store.responses;

export const getResponses = createSelector(
  getRoot,
  state => state.responses
);

export const getLoading = createSelector(
  getRoot,
  state => state.loading
);

export const getError = createSelector(
  getRoot,
  state => state.error
);

export const getResponse = createSelector(
  getRoot,
  state => state.response
);

export const RESPONSES_SELECTORS = {
  getLoading,
  getError,
  getResponses,
  getResponse
};
