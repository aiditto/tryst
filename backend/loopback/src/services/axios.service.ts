/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {BindingScope, inject, injectable} from "@loopback/core";
import {HttpErrors} from "@loopback/rest";
import axios from "axios";
import {InviteUserObject} from "./types";
@injectable({scope: BindingScope.TRANSIENT})
export class AxiosService {
  constructor(
    @inject("getAccessToken")
    public getAccessToken: Function
  ) {
    this.getAccessToken = getAccessToken;
  }

  async inviteUser(accessToken: string, data: InviteUserObject): Promise<Object> {
    const body = {
      invitedUserDisplayName: data.name,
      invitedUserEmailAddress: data.email,
      inviteRedirectUrl: process.env.FRONT_END_URL_LOCAL,
      sendInvitationMessage: true,
      invitedUserMessageInfo: {
        customizedMessageBody: "This is a custom body message",
      },
    };
    const Axios = axios.create({
      baseURL: "https://graph.microsoft.com",
    });
    const headersConfig = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };
    const invitations = "/v1.0/invitations";
    return Axios.post(invitations, body, headersConfig)
      .then(response => {
        if (response.data) {
          return response.data;
        }
        throw new HttpErrors.Error("No Token Provided");
      })
      .catch(error => {
        throw new HttpErrors.Error(error.message);
      });
  }
}
