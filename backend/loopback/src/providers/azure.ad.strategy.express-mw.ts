/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable @typescript-eslint/no-explicit-any */
import {BindingScope, composeInterceptors, inject, injectable, intercept, Provider} from "@loopback/core";
import {ExpressRequestHandler} from "@loopback/rest";
import {IProfile, OIDCStrategy as AzureAdOidc} from "passport-azure-ad";
//import * as passport from "passport";
const passport = require("passport");

export function authReturnInterceptExpressMiddleware() {
  return intercept(
    composeInterceptors(
      // "passport-init-mw",
      "passport-session-mw",
      // "passport-user-mapper",
      "passport-azure-ad-oidc-interceptor",
      "passport-user-mapper"
    )
  );
}

@injectable.provider({scope: BindingScope.SINGLETON})
export class AzureAdStrategyExpressMiddleware implements Provider<ExpressRequestHandler> {
  // FIXME: Create some kind of global rooster in the future, but securely.
  // Keep this locally scoped for now!
  users: IProfile[];
  findIprofileFromOidWithCallback: Function;
  // findByOid: Function;

  constructor(
    @inject("azuread-oidc-passport")
    public strategy: AzureAdOidc
  ) {
    this.users = [] as IProfile[];

    passport.initialize();
    // passport.session();
    passport.use(this.strategy);

    // Inspired by https://github.com/AzureADQuickStarts/AppModelv2-WebApp-OpenIDConnect-nodejs
    //-----------------------------------------------------------------------------
    // To support persistent login sessions, Passport needs to be able to
    // serialize users into and deserialize users out of the session.  Typically,
    // this will be as simple as storing the user ID when serializing, and finding
    // the user by ID when deserializing.
    //-----------------------------------------------------------------------------
    const localPushUsers = (user: IProfile) => {
      this.users.push(user);
    };

    passport.serializeUser(function (user: IProfile, done: any) {
      localPushUsers(user);
      done(null, user.oid);
    });

    const findByOid = (oid: string, fn: Function) => {
      for (let i = 0, len = this.users.length; i < len; i++) {
        const user = this.users[i];
        console.info("we are using user: ", user);
        if (user.oid === oid) {
          return fn(null, user);
        }
      }
      return fn(null, null);
    };

    this.findIprofileFromOidWithCallback = function (oid: string, done: Function) {
      findByOid(oid, function (err: any, user: IProfile) {
        done(err, user);
      });
    };

    passport.deserializeUser(this.findIprofileFromOidWithCallback);
  }

  value() {
    // Verify correct authentication
    return passport.authenticate("azuread-openidconnect");
  }
}
