/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {repository} from "@loopback/repository";
import {UserProfile as LoopbackUserProfile} from "@loopback/security";
import {User} from "../models";
import {UserRepository} from "../repositories";
export class AuthService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository
  ) {}

  async verifyUser(user: LoopbackUserProfile): Promise<User | undefined> {
    const foundUser = await this.userRepository.findOne({
      where: {oid: user.profile.oid.toLowerCase()},
    });
    if (!foundUser) {
      const objectToadd = {oid: user.profile.oid, email: user.profile._json.preferred_username, role: null};
      console.debug(JSON.stringify(objectToadd));
      return;
    }

    return foundUser;
  }
}
