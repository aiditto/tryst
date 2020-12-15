/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {BindingScope, injectable, Provider} from "@loopback/core";
import {Request} from "express";
import {IProfile, VerifyCallback, VerifyOIDCFunctionWithReq} from "passport-azure-ad";
@injectable({scope: BindingScope.TRANSIENT})
export class VerifyFunctionProvider implements Provider<VerifyOIDCFunctionWithReq> {
  constructor() {}

  value(): VerifyOIDCFunctionWithReq {
    return function (_req: Request, profile: IProfile, done: VerifyCallback) {
      done(null, profile, profile._json);
    };
  }
}
