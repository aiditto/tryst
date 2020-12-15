import axios from "axios";
import { BASE_URL } from "shared/utility";

export const API = {
  userSites: {
    get: "/api/v1/users/:id/sites"
  },
  sites: {
    create: "/api/v1/sites",
    get: "/api/v1/sites/:id",
    update: "/api/v1/sites/:id",
    delete: "/api/v1/sites/:id",
    list: "/api/v1/sites",
    count: "/api/v1/sites/count",
    patch: "/api/v1/sites/:id"
  },
  siteChannels: {
    get: "/api/v1/sites/:id/channels",
    patch: "/api/v1/sites/:id/channels"
  },
  channels: {
    create: "/api/v1/channels",
    get: "/api/v1/channels/:id",
    update: "/api/v1/channels/:id",
    delete: "/api/v1/channels/:id",
    list: "/api/v1/channels",
    count: "/api/v1/channels/count",
    patch: "/api/v1/channels/:id"
  },
  channelDemands: {
    get: "/api/v1/channels/:id/demands",
    patch: "/api/v1/channels/:id/demands"
  },
  demands: {
    create: "/api/v1/demands",
    get: "/api/v1/demands/:id",
    update: "/api/v1/demands/:id",
    delete: "/api/v1/demands/:id",
    list: "/api/v1/demands",
    count: "/api/v1/demands/count",
    patch: "/api/v1/demands/:id"
  },
  auth: {
    sso: "/api/v1/login",
    admin: "/api/v1/authorizeAdmin",
    signup: "/api/v1/auth/signup",
    refresh_token: "/api/v1/auth/refresh",
    user: "/api/v1/auth/user",
    invite: "/api/v1/auth/invite"
  }
};

export const Axios = axios.create({
  // FIXME: Move to environment variable, configurable at startup as a const (but with env variable dropped once read)
  // Right now read from utility Const
  baseURL: BASE_URL
});
