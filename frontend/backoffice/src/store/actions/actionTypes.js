// AUTH ACTION TYPES
export const LOGIN_START = "[Auth] Login Start";
export const LOGIN_SUCCESS = "[Auth] Login Success";
export const LOGIN_FAILURE = "[Auth] Login Failed";
export const LOGOUT = "[Auth] Logout";
export const GET_USER = "[Auth] Get User";
export const GET_USER_SUCCESS = "[Auth] Get User Success";
export const GET_USER_FAILURE = "[Auth] Get User Failed";
export const INVITE_USER = "[Auth] Invite User";
export const INVITE_USER_SUCCESS = "[Auth] Invite User Success";
export const INVITE_USER_FAILURE = "[Auth] Invite User Failed";

// PRODUCT ACTION TYPES
export const GET_PUBLIC_PRODUCT_LIST = "[Product] Get Public Product List";
export const GET_PUBLIC_PRODUCT_LIST_SUCCESS = "[Product] Get Public Product List Success";
export const GET_PUBLIC_PRODUCT_LIST_FAILURE = "[Product] Get Public Product List Failed";
export const GET_PRODUCT_LIST = "[Product] Get Product List";
export const GET_PRODUCT_LIST_SUCCESS = "[Product] Get Product List Success";
export const GET_PRODUCT_LIST_FAILURE = "[Product] Get Product List Failed";
export const DELETE_PRODUCT = "[Product] Delete Product";
export const DELETE_PRODUCT_SUCCESS = "[Product] Delete Product Success";
export const DELETE_PRODUCT_FAILURE = "[Product] Delete Product Failed";
export const CREATE_PRODUCT = "[Product] Create Product";
export const CREATE_PRODUCT_SUCCESS = "[Product] Create Product Success";
export const CREATE_PRODUCT_FAILURE = "[Product] Create Product Failed";
export const UPDATE_PRODUCT = "[Product] Update Product";
export const UPDATE_PRODUCT_SUCCESS = "[Product] Update Product Success";
export const UPDATE_PRODUCT_FAILURE = "[Product] Update Product Failed";
export const GET_PRODUCT = "[Product] Get Product";
export const GET_PRODUCT_SUCCESS = "[Product] Get Product Success";
export const GET_PRODUCT_FAILURE = "[Product] Get Product Failed";
export const UPDATE_SELECTED_CATEGORY = "[Product] Update Selected Category";
export const RESET_PRODUCT = "[Product] Reset product";

// MODEL ACTION TYPES
export const GET_MODEL_LIST = "[Model] Get Model List";
export const GET_MODEL_LIST_SUCCESS = "[Model] Get Model List Success";
export const GET_MODEL_LIST_FAILURE = "[Model] Get Model List Failed";
export const DELETE_MODEL = "[Model] Delete Model";
export const DELETE_MODEL_SUCCESS = "[Model] Delete Model Success";
export const DELETE_MODEL_FAILURE = "[Model] Delete Model Failed";
export const CREATE_MODEL = "[Model] Create Model";
export const CREATE_MODEL_SUCCESS = "[Model] Create Model Success";
export const CREATE_MODEL_FAILURE = "[Model] Create Model Failed";
export const UPDATE_MODEL = "[Model] Update Model";
export const UPDATE_MODEL_SUCCESS = "[Model] Update Model Success";
export const UPDATE_MODEL_FAILURE = "[Model] Update Model Failed";
export const GET_MODEL = "[Model] Get Model";
export const GET_MODEL_SUCCESS = "[Model] Get Model Success";
export const GET_MODEL_FAILURE = "[Model] Get Model Failed";

// SITE ACTION TYPES
export const GET_SITE = "[Site] Get Site";
export const GET_SITE_SUCCESS = "[Site] Get Site Success";
export const GET_SITE_FAILURE = "[Site] Get Site Failed";
export const GET_SITE_LIST = "[Site] Get Site List";
export const GET_SITE_LIST_SUCCESS = "[Site] Get Site List Success";
export const GET_SITE_LIST_FAILURE = "[Site] Get Site List Failed";
export const CREATE_SITE = "[Site] Create Site";
export const CREATE_SITE_SUCCESS = "[Site] Create Site Success";
export const CREATE_SITE_FAILURE = "[Site] Create Site Failed";
export const DELETE_SITE = "[Site] Delete Site";
export const DELETE_SITE_SUCCESS = "[Site] Delete Site Success";
export const DELETE_SITE_FAILURE = "[Site] Delete Site Failed";
export const UPDATE_SITE = "[Site] Update Site";
export const UPDATE_SITE_SUCCESS = "[Site] Update Site Success";
export const UPDATE_SITE_FAILURE = "[Site] Update Site Failed";
export const PATCH_SITE = "[Site] Patch Site";
export const PATCH_SITE_SUCCESS = "[Site] Patch Site Success";
export const PATCH_SITE_FAILURE = "[Site] Patch Site Failed";

// USERSITE ACTION TYPES
export const GET_USER_SITE_LIST = "[UserSite] Get UserSite List";
export const GET_USER_SITE_LIST_SUCCESS = "[UserSite] Get UserSite List Success";
export const GET_USER_SITE_LIST_FAILURE = "[UserSite] Get UserSite List Failed";

// CHANNEL ACTION TYPES
export const GET_CHANNEL_LIST = "[Channel] Get Channel List";
export const GET_CHANNEL_LIST_SUCCESS = "[Channel] Get Channel List Success";
export const GET_CHANNEL_LIST_FAILURE = "[Channel] Get Channel List Failed";
export const DELETE_CHANNEL = "[Channel] Delete Channel";
export const DELETE_CHANNEL_SUCCESS = "[Channel] Delete Channel Success";
export const DELETE_CHANNEL_FAILURE = "[Channel] Delete Channel Failed";
export const CREATE_CHANNEL = "[Channel] Create Channel";
export const CREATE_CHANNEL_SUCCESS = "[Channel] Create Channel Success";
export const CREATE_CHANNEL_FAILURE = "[Channel] Create Channel Failed";
export const UPDATE_CHANNEL = "[Channel] Update Channel";
export const UPDATE_CHANNEL_SUCCESS = "[Channel] Update Channel Success";
export const UPDATE_CHANNEL_FAILURE = "[Channel] Update Channel Failed";
export const UPDATE_CHANNEL_BATCH = "[Channel] Update Channel Batch";
export const UPDATE_CHANNEL_BATCH_SUCCESS = "[Channel] Update Channel Batch Success";
export const UPDATE_CHANNEL_BATCH_FAILURE = "[Channel] Update Channel Batch Failed";
export const GET_CHANNEL = "[Channel] Get Channel";
export const GET_CHANNEL_SUCCESS = "[Channel] Get Channel Success";
export const GET_CHANNEL_FAILURE = "[Channel] Get Channel Failed";
export const PATCH_CHANNEL = "[Channel] Patch Channel";
export const PATCH_CHANNEL_SUCCESS = "[Channel] Patch Channel Success";
export const PATCH_CHANNEL_FAILURE = "[Channel] Patch Channel Failed";

// SITECHANNEL ACTION TYPES
export const GET_SITE_CHANNEL_LIST = "[SiteChannel] Get SiteChannel List";
export const GET_SITE_CHANNEL_LIST_SUCCESS = "[SiteChannel] Get SiteChannel List Success";
export const GET_SITE_CHANNEL_LIST_FAILURE = "[SiteChannel] Get SiteChannel List Failed";
export const PATCH_SITE_CHANNEL_LIST = "[SiteChannel] Patch SiteChannel List";
export const PATCH_SITE_CHANNEL_LIST_SUCCESS = "[SiteChannel] Patch SiteChannel List Success";
export const PATCH_SITE_CHANNEL_LIST_FAILURE = "[SiteChannel] Patch SiteChannel List Failed";

// DEMAND ACTION TYPES
export const GET_SHORT_DEMAND_LIST = "[Demand] Get Short Demand List";
export const GET_SHORT_DEMAND_LIST_SUCCESS = "[Demand] Get Short Demand List Success";
export const GET_SHORT_DEMAND_LIST_FAILURE = "[Demand] Get Short Demand List Failed";
export const GET_DEMAND_LIST = "[Demand] Get Demand List";
export const GET_DEMAND_LIST_SUCCESS = "[Demand] Get Demand List Success";
export const GET_DEMAND_LIST_FAILURE = "[Demand] Get Demand List Failed";
export const DELETE_DEMAND = "[Demand] Delete Demand";
export const DELETE_DEMAND_SUCCESS = "[Demand] Delete Demand Success";
export const DELETE_DEMAND_FAILURE = "[Demand] Delete Demand Failed";
export const CREATE_DEMAND = "[Demand] Create Demand";
export const CREATE_DEMAND_SUCCESS = "[Demand] Create Demand Success";
export const CREATE_DEMAND_FAILURE = "[Demand] Create Demand Failed";
export const UPDATE_DEMAND = "[Demand] Update Demand";
export const UPDATE_DEMAND_SUCCESS = "[Demand] Update Demand Success";
export const UPDATE_DEMAND_FAILURE = "[Demand] Update Demand Failed";
export const UPDATE_DEMAND_BATCH = "[Demand] Update Demand Batch";
export const UPDATE_DEMAND_BATCH_SUCCESS = "[Demand] Update Demand Batch Success";
export const UPDATE_DEMAND_BATCH_FAILURE = "[Demand] Update Demand Batch Failed";
export const GET_DEMAND = "[Demand] Get Demand";
export const GET_DEMAND_SUCCESS = "[Demand] Get Demand Success";
export const GET_DEMAND_FAILURE = "[Demand] Get Demand Failed";
export const GET_DEMANDS_COUNT = "[Demand] Get Demand Count";
export const GET_DEMANDS_COUNT_SUCCESS = "[Demand] Get Demand Count Success";
export const GET_DEMANDS_COUNT_FAILURE = "[Demand] Get Demand Count Failure";
export const GET_DEMAND_PAGE_LIST = "[Demand] Get Demand Page List";
export const GET_DEMAND_PAGE_LIST_SUCCESS = "[Demand] Get Demand Page List Success";
export const GET_DEMAND_PAGE_LIST_FAILURE = "[Demand] Get Demand Page List Failed";
export const UPDATE_CURRENT_PAGE = "[Demand] Update Current Page";
export const PATCH_DEMAND = "[Demand] Patch Demand";
export const PATCH_DEMAND_SUCCESS = "[Demand] Patch Demand Success";
export const PATCH_DEMAND_FAILURE = "[Demand] Patch Demand Failed";

// CHANNELDEMAND ACTION TYPES
export const GET_CHANNEL_DEMAND_LIST = "[ChannelDemand] Get UserSite List";
export const GET_CHANNEL_DEMAND_LIST_SUCCESS = "[ChannelDemand] Get UserSite List Success";
export const GET_CHANNEL_DEMAND_LIST_FAILURE = "[ChannelDemand] Get UserSite List Failed";
export const PATCH_CHANNEL_DEMAND_LIST = "[ChannelDemand] Patch ChannelDemand List";
export const PATCH_CHANNEL_DEMAND_LIST_SUCCESS = "[ChannelDemand] Patch ChannelDemand List Success";
export const PATCH_CHANNEL_DEMAND_LIST_FAILURE = "[ChannelDemand] Patch ChannelDemand List Failed";

// ASSET ACTION TYPES
export const GET_SHORT_ASSET_LIST = "[Asset] Get Short Asset List";
export const GET_SHORT_ASSET_LIST_SUCCESS = "[Asset] Get Short Asset List Success";
export const GET_SHORT_ASSET_LIST_FAILURE = "[Asset] Get Short Asset List Failed";
export const GET_ASSET_LIST = "[Asset] Get Asset List";
export const GET_ASSET_LIST_SUCCESS = "[Asset] Get Asset List Success";
export const GET_ASSET_LIST_FAILURE = "[Asset] Get Asset List Failed";
export const GET_ASSET_LIST_BY_USER = "[Asset] Get Asset List for User";
export const GET_ASSET_LIST_BY_USER_SUCCESS = "[Asset] Get Asset List for User Success";
export const GET_ASSET_LIST_BY_USER_FAILURE = "[Asset] Get Asset List for User Failed";
export const DELETE_ASSET = "[Asset] Delete Asset";
export const DELETE_ASSET_SUCCESS = "[Asset] Delete Asset Success";
export const DELETE_ASSET_FAILURE = "[Asset] Delete Asset Failed";
export const CREATE_ASSET = "[Asset] Create Asset";
export const CREATE_ASSET_SUCCESS = "[Asset] Create Asset Success";
export const CREATE_ASSET_FAILURE = "[Asset] Create Asset Failed";
export const UPDATE_ASSET = "[Asset] Update Asset";
export const UPDATE_ASSET_SUCCESS = "[Asset] Update Asset Success";
export const UPDATE_ASSET_FAILURE = "[Asset] Update Asset Failed";
export const UPDATE_ASSET_BATCH = "[Asset] Update Asset Batch";
export const UPDATE_ASSET_BATCH_SUCCESS = "[Asset] Update Asset Batch Success";
export const UPDATE_ASSET_BATCH_FAILURE = "[Asset] Update Asset Batch Failed";
export const CONNECTED_ASSETS_NOTIFICATION_FAILURE = "[Mailer] Connected Assets Notification Failed";
export const GET_ASSET = "[Asset] Get Asset";
export const GET_ASSET_SUCCESS = "[Asset] Get Asset Success";
export const GET_ASSET_FAILURE = "[Asset] Get Asset Failed";
export const GET_ASSETS_COUNT = "[Asset] Get Asset Count";
export const GET_ASSETS_COUNT_SUCCESS = "[Asset] Get Asset Count Success";
export const GET_ASSETS_COUNT_FAILURE = "[Asset] Get Asset Count Failure";
export const GET_ASSET_PAGE_LIST = "[Asset] Get Asset Page List";
export const GET_ASSET_PAGE_LIST_SUCCESS = "[Asset] Get Asset Page List Success";
export const GET_ASSET_PAGE_LIST_FAILURE = "[Asset] Get Asset Page List Failed";
export const UPDATE_CURRENT_ASSET_PAGE = "[Asset] Update Current Page";
export const UPDATE_ASSET_FILTER = "[Asset] Update Asset Filter";

//REGFORM ACTION TYPES
export const GET_SWEDISH_CITIES_SUCCESS = "[Regform] Get Swedish Cities Success";
export const GET_SWEDISH_CITIES_FAILURE = "[Regform] Get Swedish Cities Success";
export const VALID_USERFORM = "[Regform] UserForm is valid!";
export const INVALID_USERFORM = "[Regform] UserForm is invalid!";
export const VALID_COMPANYFORM = "[Regform] CompForm is valid!";
export const INVALID_COMPANYFORM = "[Regform] CompForm is invalid!";

//USER SIGNUP TYPES
export const CREATE_USER_SUCCESS = "[USER] Created user!";
export const CREATE_USER_FAILURE = "[USER] Failed to create user!";
export const VALID_USER_DATA = "[USER] Valid user data!";

// UI ACTION TYPES
export const SHOW_NOTIFICATION = "[Notification] Show Notification";
export const HIDE_NOTIFICATION = "[Notification] Hide Notification";
export const TOGGLE_DRAWER = "[Drawer] Toggle Drawer";
export const REDIRECT = "[REDIRECT] Added";
export const REDIRECT_REMOVE = "[REDIRECT] Removed";

//CONNECT DEMAND AND ASSET ITEMS TYPE
export const DEMAND_ITEM_CONNECTED = "[CONNECTEDITEMS] Demand item connected";
export const DEMAND_ITEM_DISCONNECTED = "[CONNECTEDITEMS] Demand item disconnected";
export const ASSET_ITEM_CONNECTED = "[CONNECTEDITEMS] Asset item connected";
export const ASSET_ITEM_DISCONNECTED = "[CONNECTEDITEMS] Asset item disconnected";
export const FILTER_ASSETS_BY_DEMAND = "[CONNECTEDITEMS] Filter Assets by Demand";
export const CLEAR_CONNECTED_ITEMS = "[CONNECTEDITEMS Clear connected items";

// NEWS ACTIONS
export const GET_NEWS = "[News] Get News";
export const GET_NEWS_SUCCESS = "[News] Get News Success";
export const GET_NEWS_FAILURE = "[News] Get News Failed";
export const UPDATE_NEWS_FILTER = "[News] Update News Filter";
