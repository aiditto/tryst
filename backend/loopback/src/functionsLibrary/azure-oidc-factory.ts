/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {IOIDCStrategyOptionWithRequest, OIDCStrategy, VerifyOIDCFunctionWithReq} from "passport-azure-ad";

export function configuredOidcStrategyFactory(config: IOIDCStrategyOptionWithRequest): Function {
  const configuredOIDCStrategyFn = (verifyFn: VerifyOIDCFunctionWithReq): OIDCStrategy => {
    return new OIDCStrategy(config, verifyFn);
  };
  return configuredOIDCStrategyFn;
}
