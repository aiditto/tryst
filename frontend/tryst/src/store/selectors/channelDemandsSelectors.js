import { createSelector } from "reselect";

const getRoot = store => store.channelDemands;

export const getDemands = createSelector(
  getRoot,
  state => state.demands
);

export const getLoading = createSelector(
  getRoot,
  state => state.loading
);

export const getError = createSelector(
  getRoot,
  state => state.error
);

export const CHANNEL_DEMANDS_SELECTORS = {
  getLoading,
  getError,
  getDemands
};
