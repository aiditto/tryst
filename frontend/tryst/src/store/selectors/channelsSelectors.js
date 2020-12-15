import { createSelector } from "reselect";

const getRoot = store => store.channels;

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

export const getChannel = createSelector(
  getRoot,
  state => state.channel
);

export const CHANNELS_SELECTORS = {
  getLoading,
  getError,
  getChannels,
  getChannel
};
