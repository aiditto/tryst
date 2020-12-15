/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {IOIDCStrategyOptionWithRequest} from "passport-azure-ad";

const envAzureCookieEncryptKeys = process.env.AZURE_COOKIE_ENCRYPTKEYS;
if (!envAzureCookieEncryptKeys) {
  throw new Error("Environment variable AZURE_COOKIE_ENCRYPTKEYS is not set");
}

const creds: IOIDCStrategyOptionWithRequest = {
  // Required
  identityMetadata:
    "https://login.microsoftonline.com/" + process.env.AZURE_TENANT + "/v2.0/.well-known/openid-configuration",

  // Required, the client ID of your app in AAD
  clientID: process.env.AZURE_CLIENTID ?? "",

  // Required, must be 'code', 'code id_token', 'id_token code' or 'id_token'
  // If you want to get access_token, you must use 'code', 'code id_token' or 'id_token code'
  responseType: "code id_token",

  // Required
  responseMode: "form_post",

  // Required, the reply URL registered in AAD for your app
  redirectUrl: process.env.AZURE_REDIRECTURL ?? "",

  // Required if we use http for redirectUrl
  allowHttpForRedirectUrl: true,

  // Required if `responseType` is 'code', 'id_token code' or 'code id_token'.
  // If app key contains '\', replace it with '\\'.
  clientSecret: process.env.AZURE_CLIENTSECRET ?? "", // hoijnet client secret

  // Required to set to false if you don't want to validate issuer
  validateIssuer: false,

  // Required if you want to provide the issuer(s) you want to validate instead of using the issuer from metadata
  // issuer could be a string or an array of strings of the following form: 'https://sts.windows.net/<tenant_guid>/v2.0'
  issuer: undefined,

  // Required to set to true if the `verify` function has 'req' as the first parameter
  passReqToCallback: true,

  // Recommended to set to true. By default we save state in express session, if this option is set to true, then
  // we encrypt state and save it in cookie instead. This option together with { session: false } allows your app
  // to be completely express session free.
  useCookieInsteadOfSession: true,

  // Required if `useCookieInsteadOfSession` is set to true. You can provide multiple set of key/iv pairs for key
  // rollover purpose. We always use the first set of key/iv pair to encrypt cookie, but we will try every set of
  // key/iv pair to decrypt cookie. Key can be any string of length 32, and iv can be any string of length 12.
  cookieEncryptionKeys: JSON.parse(Buffer.from(envAzureCookieEncryptKeys, "base64").toString("ascii")),

  // The additional scopes we want besides 'openid'.
  // 'profile' scope is required, the rest scopes are optional.
  // (1) if you want to receive refresh_token, use 'offline_access' scope
  // (2) if you want to get access_token for graph api, use the graph api url like 'https://graph.microsoft.com/mail.read'
  scope: ["profile", "offline_access" /*, 'https://graph.microsoft.com/mail.read'*/],

  // Optional, 'error', 'warn' or 'info'
  loggingLevel: "info",

  // Optional. The lifetime of nonce in session or cookie, the default value is 3600 (seconds).
  // nonceLifetime: null,

  // Optional. The max amount of nonce saved in session or cookie, the default value is 10.
  nonceMaxAmount: 5,

  // Optional. The clock skew allowed in token validation, the default value is 300 seconds.
  // clockSkew: null,
};

// The url you need to go to destroy the session with AAD
exports.destroySessionUrl = process.env.AZURE_LOGOUT_REDIRECTURL ?? "";

// Secrets should never be allowed to live on in environment variables in the application
delete process.env.AZURE_CLIENTSECRET;
delete process.env.AZURE_COOKIE_ENCRYPTKEYS;
export default creds;
