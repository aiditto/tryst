/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable @typescript-eslint/naming-convention */
import {authenticate, AuthenticationBindings} from "@loopback/authentication";
import {inject, service} from "@loopback/core";
import {get, param, post, requestBody, RequestWithSession, Response, RestBindings} from "@loopback/rest";
import {SecurityBindings, UserProfile} from "@loopback/security";
import moment from "moment";
import qs from "querystring";
import {authReturnInterceptExpressMiddleware, AUTH_STRATEGY_NAME} from "../providers";
import {AuthService, AxiosService, InviteUserObject, JWTService, UserProfile as CustomUserProfile} from "../services";

const CredentialsSchema = {
  type: "object",
  required: ["email", "password"],
  properties: {
    email: {
      type: "string",
      format: "email",
    },
    password: {
      type: "string",
    },
  },
};

export const CredentialsRequestBody = {
  description: "The input of login function",
  required: true,
  content: {
    "application/json": {schema: CredentialsSchema},
  },
};

export declare type TokenObject = {
  token: string;
  expiresAt: number;
};

export class AuthController {
  constructor(
    @service(JWTService)
    public jwtService: JWTService,
    @service(AuthService)
    public authService: AuthService,
    @service(AxiosService)
    public axiosService: AxiosService
  ) {}

  @post("/auth/refresh", {
    responses: {
      "200": {
        description: "Token Object",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                token: {
                  type: "string",
                },
                expiresAt: {
                  type: "number",
                },
              },
            },
          },
        },
      },
    },
  })
  async refresh(@param.header.string("Authorization") token: string): Promise<TokenObject> {
    const userData = await this.jwtService.verifyToken(token);
    const accessToken = await this.jwtService.generateToken(userData as CustomUserProfile);
    return {
      token: accessToken,
      expiresAt: moment().add(2, "h").valueOf(),
    };
  }

  @authenticate(AUTH_STRATEGY_NAME)
  @get("/login")
  async sso(
    @inject(AuthenticationBindings.AUTHENTICATION_REDIRECT_URL) redirectUrl: string,
    @inject(AuthenticationBindings.AUTHENTICATION_REDIRECT_STATUS)
    status: number,
    @inject(RestBindings.Http.RESPONSE)
    response: Response
  ): Promise<Response> {
    response.statusCode = status || 302;
    response.setHeader("Location", redirectUrl);
    response.end();
    return response;
  }

  @authReturnInterceptExpressMiddleware()
  @post("/auth/openid/return")
  async azureOidcReturnFunction(
    // More info on interceptors: https://loopback.io/doc/en/lb4/Express-middleware.html#use-express-middleware-as-interceptors-for-controllers
    // Create an interceptor using lb4
    // https://loopback.io/doc/en/lb4/Express-middleware.html#use-lb4-interceptor-command-to-create-interceptors-for-express-middleware
    @inject(SecurityBindings.USER) user: UserProfile,
    @inject(RestBindings.Http.RESPONSE)
    response: Response,
    @inject(RestBindings.Http.REQUEST)
    request: RequestWithSession,
    @requestBody({
      content: {
        "application/x-www-form-urlencoded": {
          schema: {type: "object"},
        },
      },
    })
    options: unknown
  ) {
    const verifiedUser = await this.authService.verifyUser(user);
    if (verifiedUser) {
      // FIXME : Add extra layer of verification regarding instance checking
      const userProfile = this.jwtService.convertToAzureUserProfile(verifiedUser);
      const token = await this.jwtService.generateToken(userProfile);
      // Expires the cookie after 5 second once client application receives it
      response.cookie("session-token", token, {expires: new Date(Date.now() + 5000)});
      response.cookie("session-exp", user.profile._json.exp, {expires: new Date(Date.now() + 5000)});
    }
    // To run locally with Frontend side, add fFRONT_END_URL_LOCAL
    // in .env file e.g http://localhost:3000
    let redirectPath = "/bo/interceptor?redirect=backend";
    if (process.env.NODE_ENV === "local") {
      redirectPath = process.env.FRONT_END_URL_LOCAL + redirectPath;
    }
    response.redirect(redirectPath);
    response.end();
    return response;
  }

  // ######################################################################################################
  /// FROM GRAPHQL REPOSITORY (uses an initialized passport library with our strategy)
  // ######################################################################################################

  // APP INITIALIZATION
  // var passport = configurePassport({config,log});
  // // Initialize Passport!  Also use passport.session() middleware, to support
  // // persistent login sessions (recommended).
  // app.use(passport.initialize());
  // app.use(passport.session());

  // MIDDLEWARE FUNCTION
  // // 'POST returnURL'
  // // `passport.authenticate` will try to authenticate the content returned in
  // // body (such as authorization code). If authentication fails, user will be
  // // redirected to '/' (home page); otherwise, it passes to the next middleware.
  // app.post(
  //   "/auth/openid/return",
  //   function (req, res, next) {
  //     passport.authenticate("azuread-openidconnect", {
  //       response: res,
  //       failureRedirect: "/loginFailed",
  //     })(req, res, next);
  //   },
  //   function (req, res) {
  //     log.info("We received a return from AzureAD.");
  //     res.redirect("/");
  //   }
  // );
  // ######################################################################################################
  /// FROM GRAPHQL REPOSITORY (uses an initialized passport library with our strategy)
  // ######################################################################################################

  @get("/auth/openid/return")
  async azureOidcReturnFunctionGet(
    @inject(SecurityBindings.USER, {optional: true}) user: UserProfile,
    @inject(RestBindings.Http.RESPONSE)
    response: Response,
    @inject(RestBindings.Http.REQUEST)
    request: RequestWithSession
  ) {
    console.log("yet to be implemented");
    return request.session;
  }

  @authenticate(AUTH_STRATEGY_NAME)
  @get("/authorizeAdmin")
  async authorizeAdmin(
    @inject(RestBindings.Http.RESPONSE)
    response: Response
  ): Promise<Response> {
    const queryParams = qs.stringify({
      client_id: process.env.AZURE_CLIENTID,
      response_type: "code",
      response_mode: "query",
      scope: "offline_access user.read",
      state: 12345,
      redirect_uri: process.env.AZURE_REDIRECTURL_AUTHZ,
    });

    const redirectPath =
      "https://login.microsoftonline.com/" + process.env.AZURE_TENANT + "/oauth2/v2.0/authorize?" + queryParams;
    response.redirect(redirectPath);
    response.end();
    return response;
  }

  @get("/auth/authz/return")
  async azureAuthzReturnFunctionPost(
    @inject(SecurityBindings.USER, {optional: true}) user: UserProfile,
    @inject(RestBindings.Http.RESPONSE)
    response: Response,
    @inject(RestBindings.Http.REQUEST)
    request: RequestWithSession
  ) {
    const accessToken = await this.axiosService.getAccessToken(request.query.code);
    if (accessToken) {
      const userToken = await this.jwtService.generateUserToken(accessToken);
      // Expires the cookie after 5 second once client application receives it
      response.cookie("admin-token", userToken, {expires: new Date(Date.now() + 5000)});
      response.cookie("admin-exp", accessToken.expires_in, {expires: new Date(Date.now() + 5000)});
    }

    let redirectPath = "/bo/users?redirect=backend";
    if (process.env.NODE_ENV === "local") {
      redirectPath = process.env.FRONT_END_URL_LOCAL + redirectPath;
    }
    response.redirect(redirectPath);
    response.end();
    return response;
  }

  @authenticate("jwt")
  @post("/auth/invite")
  async inviteUser(
    @param.header.string("Authorization") userToken: string,
    @requestBody({
      content: {
        "application/json": {
          schema: {type: "object"},
        },
      },
    })
    data: InviteUserObject
  ): Promise<Object | undefined> {
    const accessToken = await this.jwtService.verifyUserToken(userToken);
    if (accessToken) {
      // Need to figure out, how to save value in DB
      return this.axiosService.inviteUser(accessToken, data);
    }
  }

  @authenticate("jwt")
  @get("/auth/user", {
    responses: {
      "200": {
        description: "UserId of logged in user",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userId: {
                  type: "number",
                },
              },
            },
          },
        },
      },
    },
  })
  async getuserId(@param.header.string("Authorization") token: string): Promise<Object> {
    const userData = await this.jwtService.verifyToken(token);
    return {userId: (userData as CustomUserProfile).id};
  }
}
