/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/* eslint-disable @typescript-eslint/naming-convention */
import {TokenServiceBindings} from "@loopback/authentication-jwt";
import {inject} from "@loopback/context";
import {HttpErrors} from "@loopback/rest";
import {promisify} from "util";
import {User} from "../models";
import {AccessTokenObject, UserProfile} from "./index";

const jwt = require("jsonwebtoken");
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SECRET)
    private jwtSecret: string,
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    private jwtExpiresIn: string
  ) {}

  async verifyToken(token: string): Promise<UserProfile | undefined> {
    if (!token) {
      throw new HttpErrors.Unauthorized(`Error verifying token : 'token' is null`);
    }
    let userProfile: UserProfile;

    if (token.substring(0, 7) === "Bearer ") {
      token = token.substring(7, token.length);

      try {
        // decode user profile from token
        const decodedToken = await verifyAsync(token, this.jwtSecret);
        userProfile = Object.assign({
          id: decodedToken.id,
          oid: decodedToken.oid,
          email: decodedToken.email,
          role: decodedToken.role,
        });
        return userProfile;
      } catch (error) {
        throw new HttpErrors.Unauthorized(`Error verifying token : ${error.message}`);
      }
    }
  }

  async generateToken(userProfile: UserProfile): Promise<string> {
    if (!userProfile) {
      throw new HttpErrors.Unauthorized("Error generating token : userProfile is null");
    }
    const userInfoForToken = {
      id: userProfile.id,
      oid: userProfile.oid,
      email: userProfile.email,
      role: userProfile.role,
    };
    // Generate a JSON Web Token
    let token: string;
    try {
      token = await signAsync(userInfoForToken, this.jwtSecret, {
        expiresIn: Number(this.jwtExpiresIn),
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }

    return token;
  }

  async generateUserToken(accessToken: AccessTokenObject): Promise<string> {
    if (!accessToken) {
      throw new HttpErrors.Unauthorized("Error generating token : AccessToken is null");
    }

    // Generate a JSON Web Token
    let token: string;
    try {
      token = await signAsync({access_token: accessToken.access_token}, this.jwtSecret, {
        expiresIn: Number(accessToken.expires_in),
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }

    return token;
  }

  async verifyUserToken(userToken: string): Promise<string | undefined> {
    if (!userToken) {
      throw new HttpErrors.Unauthorized(`Error verifying token : 'token' is null`);
    }
    let acessToken: string;

    if (userToken.substring(0, 7) === "Bearer ") {
      userToken = userToken.substring(7, userToken.length);

      try {
        // decode AccessToken from token
        const decodedToken = await verifyAsync(userToken, this.jwtSecret);
        acessToken = decodedToken.access_token;
        return acessToken;
      } catch (error) {
        throw new HttpErrors.Unauthorized(`Error verifying token : ${error.message}`);
      }
    }
  }

  convertToAzureUserProfile(user: User): UserProfile {
    return {
      id: user.id ?? 0,
      oid: user.oid,
      email: user.email,
      role: "none",
    };
  }
}
