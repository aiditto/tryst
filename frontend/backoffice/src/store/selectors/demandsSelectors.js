import { createSelector } from "reselect";

const getRoot = store => store.demands;

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

export const getDemand = createSelector(
  getRoot,
  state => state.demand
);

export const DEMANDS_SELECTORS = {
  getLoading,
  getError,
  getDemands,
  getDemand
};
