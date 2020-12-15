/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Interceptor, InvocationContext, Next, Provider} from "@loopback/core";
import {RequestContext, RestBindings} from "@loopback/rest";
import {SecurityBindings, securityId, UserProfile} from "@loopback/security";
import {User} from "../models";

export class PassportUserMapper implements Provider<Interceptor> {
  constructor() {}

  value() {
    return async (invocationCtx: InvocationContext, next: Next) => {
      const requestCtx = invocationCtx.getSync<RequestContext>(RestBindings.Http.CONTEXT);
      const request = requestCtx.request;
      if (request.user) {
        const user: User = request.user as User;
        requestCtx.bind(SecurityBindings.USER).to(mapProfile(user));
      }
      return next();
    };
  }
}

/**
 * maps returned User model from verify function to UserProfile
 *
 * @param user
 */
const mapProfile = (user: User): UserProfile => {
  const userProfile: UserProfile = {
    [securityId]: "" + user.id,
    profile: {
      ...user,
    },
  };
  return userProfile;
};
