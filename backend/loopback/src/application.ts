/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {AuthenticationBindings, AuthenticationComponent} from "@loopback/authentication";
import {JWTAuthenticationComponent, TokenServiceBindings} from "@loopback/authentication-jwt";
import {BootMixin} from "@loopback/boot";
import {addExtension, ApplicationConfig, createBindingFromClass} from "@loopback/core";
import {RepositoryMixin} from "@loopback/repository";
import {RestApplication, toInterceptor} from "@loopback/rest";
import {RestExplorerBindings, RestExplorerComponent} from "@loopback/rest-explorer";
import {ServiceMixin} from "@loopback/service-proxy";
import passport from "passport";
import path from "path";
import {configuredOidcStrategyFactory, getAccessTokenFn} from "./functionsLibrary";
import {AzureAdStrategyInterceptor} from "./interceptors";
import {
  AzureAdOidc,
  AzureAdStrategyExpressMiddleware,
  AzureAdStrategyProvider,
  PassportUserMapper,
  VerifyFunctionProvider,
} from "./providers";
import config from "./providers/config-azuread";
import {MySequence} from "./sequence";

const cookieParser = require("cookie-parser");

export {ApplicationConfig};

export class App extends BootMixin(ServiceMixin(RepositoryMixin(RestApplication))) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    this.component(AuthenticationComponent);

    // Mount jwt component
    this.component(JWTAuthenticationComponent);

    this.setUpBindings();

    // for jwt access token
    this.bind(TokenServiceBindings.TOKEN_SECRET).to(process.env.SERVER_SECRET ?? "");

    delete process.env.SERVER_SECRET;

    this.expressMiddleware("cookie-parser", cookieParser());
    this.expressMiddleware("passport-initialize", passport.initialize());

    // Set up the custom sequence
    this.sequence(MySequence);

    // register PassportOIDCProvider as a custom authentication strategy
    addExtension(this, AuthenticationBindings.AUTHENTICATION_STRATEGY_EXTENSION_POINT_NAME, AzureAdStrategyProvider, {
      namespace: AuthenticationBindings.AUTHENTICATION_STRATEGY_EXTENSION_POINT_NAME,
    });

    // Set up default home page
    this.static("/", path.join(__dirname, "../public"));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: "/explorer",
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ["controllers"],
        extensions: [".controller.js"],
        nested: true,
      },
    };
  }

  setUpBindings(): void {
    this.add(
      createBindingFromClass(AzureAdStrategyExpressMiddleware, {
        key: "azureAdStrategyExpressMiddleware",
      })
    );

    // configuration should be kept secret which is why we are using factories.
    this.bind("configuredOIDCStrategyFn").to(configuredOidcStrategyFactory(config));
    this.bind("getAccessToken").to(getAccessTokenFn(config));

    this.bind("azure-ad-strategy-provider").toProvider(AzureAdStrategyProvider);
    this.bind("azuread-oidc-passport").toProvider(AzureAdOidc);

    this.bind("authentication.oidc.verify").toProvider(VerifyFunctionProvider);

    this.bind("passport-init-mw").to(toInterceptor(passport.initialize()));
    this.bind("passport-session-mw").to(toInterceptor(passport.session()));
    this.bind("passport-azure-ad-oidc-interceptor").toProvider(AzureAdStrategyInterceptor);
    this.bind("passport-user-mapper").toProvider(PassportUserMapper);
  }
}
