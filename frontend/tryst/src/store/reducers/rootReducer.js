import { combineReducers } from "redux";
import authReducer from "./authReducer";
import channelsReducer from "./channelsReducer";
import demandsReducer from "./demandsReducer";
import uiReducer from "./uiReducer";
import wordpressReducer from "./wordpressReducer";
import sitesReducer from "./sitesReducer";
import userSitesReducer from "./userSitesReducer";
import siteChannelsReducer from "./siteChannelsReducer";
import channelDemandsReducer from "./channelDemandsReducer";
import locationReducer from "./locationReducer";
import responsesReducer from "./responsesReducer";

export default combineReducers({
  auth: authReducer,
  ui: uiReducer,
  location: locationReducer,
  wp: wordpressReducer,
  channels: channelsReducer,
  demands: demandsReducer,
  sites: sitesReducer,
  responses: responsesReducer,
  userSites: userSitesReducer,
  siteChannels: siteChannelsReducer,
  channelDemands: channelDemandsReducer
});
