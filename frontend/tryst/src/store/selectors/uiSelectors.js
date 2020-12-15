import { createSelector } from "reselect";

const getRoot = store => store.ui;

export const getMessage = createSelector(
  getRoot,
  state => state.message
);

export const getAlertType = createSelector(
  getRoot,
  state => state.alertType
);

export const getShow = createSelector(
  getRoot,
  state => state.show
);

export const UI_SELECTORS = {
  getMessage,
  getShow,
  getAlertType
};
