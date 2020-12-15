import { createSelector } from "reselect";

const getRoot = store => store.siteChannels;

export const getChannels = createSelector(
  getRoot,
  state => state.channels
);

export const getLoading = createSelector(
  getRoot,
  state => state.loading
);

export const getError = createSelector(
  getRoot,
  state => state.error
);

export const SITE_CHANNELS_SELECTORS = {
  getLoading,
  getError,
  getChannels
};
