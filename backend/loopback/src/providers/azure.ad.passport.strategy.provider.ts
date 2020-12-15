/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {BindingScope, inject, injectable, Provider} from "@loopback/core";
import {OIDCStrategy, VerifyOIDCFunctionWithReq} from "passport-azure-ad";

@injectable.provider({scope: BindingScope.SINGLETON})
export class AzureAdOidc implements Provider<OIDCStrategy> {
  strategy: OIDCStrategy;

  constructor(
    // FIXME: Add service to map the users in the verify function,
    // see https://github.com/strongloop/loopback-next/blob/2249682df2c81782f76e326798bbd87ef69b7026/examples/passport-login/src/services/user.service.ts
    // and https://github.com/strongloop/loopback-next/blob/2249682df2c81782f76e326798bbd87ef69b7026/examples/passport-login/src/authentication-strategy-providers/google.ts
    // @inject(UserServiceBindings.PASSPORT_USER_IDENTITY_SERVICE)
    // public userService: UserIdentityService<Profile, User>
    @inject("authentication.oidc.verify")
    private verifyFn: VerifyOIDCFunctionWithReq,
    @inject("configuredOIDCStrategyFn")
    private configuredOIDCStrategyFn: Function
  ) {
    this.strategy = this.configuredOIDCStrategyFn(this.verifyFn);
  }

  value() {
    return this.strategy;
  }
}
