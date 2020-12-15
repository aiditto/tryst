/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Getter, inject} from "@loopback/core";
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from "@loopback/repository";
import {DbDataSource} from "../datasources";
import {Channel, Site, SiteRelations, User} from "../models";
import {ChannelRepository} from "./channel.repository";
import {UserRepository} from "./user.repository";

export class SiteRepository extends DefaultCrudRepository<Site, typeof Site.prototype.id, SiteRelations> {
  public readonly channels: HasManyRepositoryFactory<Channel, typeof Site.prototype.id>;

  public readonly users: HasManyRepositoryFactory<User, typeof Site.prototype.id>;

  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("ChannelRepository") protected channelRepositoryGetter: Getter<ChannelRepository>,
    @repository.getter("UserRepository") protected userRepositoryGetter: Getter<UserRepository>
  ) {
    super(Site, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor("users", userRepositoryGetter);
    this.registerInclusionResolver("users", this.users.inclusionResolver);
    this.channels = this.createHasManyRepositoryFactoryFor("channels", channelRepositoryGetter);
    this.registerInclusionResolver("channels", this.channels.inclusionResolver);
  }
}
