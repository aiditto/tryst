/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable @typescript-eslint/naming-convention */
export declare type UserProfile = {
  id: number;
  oid: string;
  email: string;
  role: string;
};

export declare type AccessTokenObject = {
  token_type: string;
  scope: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
};

export declare type Credentials = {
  email: string;
  password: string;
};

export declare type TokenObject = {
  token: string;
};

export declare type InviteUserObject = {
  email: string;
  name: string;
  siteId: number;
};
