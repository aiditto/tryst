/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {asAuthStrategy, AuthenticationStrategy} from "@loopback/authentication";
import {StrategyAdapter} from "@loopback/authentication-passport";
import {inject, injectable, Provider} from "@loopback/core";
import {OIDCStrategy as AzureAdOidc} from "passport-azure-ad";
import {User} from "../models";

export const AUTH_STRATEGY_NAME = "OIDC";
@injectable(asAuthStrategy)
//@injectable.provider({scope: BindingScope.SINGLETON})
export class AzureAdStrategyProvider implements Provider<AuthenticationStrategy> {
  name = "azure-ad";
  protected strategy: StrategyAdapter<User>;

  constructor(
    // @inject(AuthenticationBindings.USER_PROFILE_FACTORY)
    // private userProfileFactory: UserProfileFactory<String>
    @inject("azuread-oidc-passport")
    public passportStrategy: AzureAdOidc
  ) {
    this.strategy = this.convertToAuthStrategy(passportStrategy);
  }

  value(): AuthenticationStrategy {
    return this.strategy;
  }

  convertToAuthStrategy(oidcStrategy: AzureAdOidc): StrategyAdapter<User> {
    return new StrategyAdapter(oidcStrategy, AUTH_STRATEGY_NAME /* , this.userProfileFactory */);
  }
}
