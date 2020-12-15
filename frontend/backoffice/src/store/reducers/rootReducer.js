import { combineReducers } from "redux";
import authReducer from "./authReducer";
import channelsReducer from "./channelsReducer";
import uiReducer from "./uiReducer";
import sitesReducer from "./sitesReducer";
import userSitesReducer from "./userSitesReducer";
import demandsReducer from "./demandsReducer";
import channelDemandsReducer from "./channelDemandsReducer";
import siteChannelsReducer from "./siteChannelsReducer";

export default combineReducers({
  auth: authReducer,
  ui: uiReducer,
  sites: sitesReducer,
  userSites: userSitesReducer,
  channels: channelsReducer,
  siteChannels: siteChannelsReducer,
  demands: demandsReducer,
  channelDemands: channelDemandsReducer
});
