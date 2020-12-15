import axios from "axios";
import { BASE_URL } from "shared/utility";

export const API = {
  userSites: {
    get: "/api/v1/users/:id/sites"
  },
  siteChannels: {
    get: "/api/v1/sites/:id/channels"
  },
  channelDemands: {
    get: "/api/v1/channels/:id/demands"
  },
  sites: {
    create: "/api/v1/sites",
    get: "/api/v1/sites/:id",
    update: "/api/v1/sites/:id",
    delete: "/api/v1/sites/:id",
    list: "/api/v1/sites",
    count: "/api/v1/sites/count"
  },
  channels: {
    create: "/api/v1/channels",
    get: "/api/v1/channels/:id",
    update: "/api/v1/channels/:id",
    delete: "/api/v1/channels/:id",
    list: "/api/v1/channels",
    count: "/api/v1/channels/count"
  },
  demands: {
    create: "/api/v1/demands",
    get: "/api/v1/demands/:id",
    update: "/api/v1/demands/:id",
    delete: "/api/v1/demands/:id",
    list: "/api/v1/demands",
    count: "/api/v1/demands/count"
  },
  responses: {
    create: "/api/v1/responses",
    get: "/api/v1/responses/:id",
    update: "/api/v1/responses/:id",
    delete: "/api/v1/responses/:id",
    list: "/api/v1/responses",
    count: "/api/v1/responses/count"
  },
  asset: {
    create: "/api/v0/asset/create",
    get: "/api/v0/asset/get/:id",
    listByUser: "/api/v0/asset/list-by-user",
    update: "/api/v0/asset/update",
    delete: "/api/v0/asset/remove/:id",
    list: "/api/v0/asset/list",
    pageList: "/api/v0/asset/page",
    count: "/api/v0/asset/count",
    batch: "/api/v0/asset/batch"
  },
  auth: {
    login: "/api/v1/auth/login",
    signup: "/api/v1/auth/signup",
    refresh_token: "/api/v1/auth/refresh",
    user: "/api/v1/auth/user"
  },
  location: {
    getSwe: "/api/v0/location/1/cities "
  },
  wp: {
    page_info: "/api/v0/wp/page-info",
    news: "/api/v0/wp/news",
    item_info: "/api/v0/wp/item-info"
  },
  mailer: {
    connectedAssets: "/api/v0/mailer/connected-assets"
  }
};

export const Axios = axios.create({
  // FIXME: Move to environment variable, configurable at startup as a const (but with env variable dropped once read)
  baseURL: BASE_URL
});
