/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable @typescript-eslint/naming-convention */
import {HttpErrors} from "@loopback/rest";
import axios from "axios";
import {IOIDCStrategyOptionWithRequest} from "passport-azure-ad";
import qs from "querystring";

/*
Guard the secrets and not have it as dependency that can be injected.
*/
export function getAccessTokenFn(config: IOIDCStrategyOptionWithRequest) {
  return async (code: string): Promise<Object> => {
    const Axios = axios.create({
      baseURL: "https://login.microsoftonline.com",
    });
    const headersConfig = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    const getAccessToken = "/" + process.env.AZURE_TENANT + "/oauth2/v2.0/token";
    return Axios.post(
      getAccessToken,
      qs.stringify({
        client_id: config.clientID,
        client_secret: config.clientSecret,
        grant_type: "authorization_code",
        scope: "offline_access user.read",
        code: code,
        redirect_uri: process.env.AZURE_REDIRECTURL_AUTHZ ?? "",
      }),
      headersConfig
    )
      .then(response => {
        if (response.data) {
          return response.data;
        }
        throw new HttpErrors.Error("No Token Provided");
      })
      .catch(error => {
        throw new HttpErrors.Error(error.message);
      });
  };
}
