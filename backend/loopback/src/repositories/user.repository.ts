/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Getter, inject} from "@loopback/core";
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from "@loopback/repository";
import {DbDataSource} from "../datasources";
import {Site, User, UserRelations} from "../models";
import {SiteRepository} from "./site.repository";

export class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.id, UserRelations> {
  public readonly sites: HasManyRepositoryFactory<Site, typeof User.prototype.id>;

  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("SiteRepository") protected siteRepositoryGetter: Getter<SiteRepository>
  ) {
    super(User, dataSource);
    this.sites = this.createHasManyRepositoryFactoryFor("sites", siteRepositoryGetter);
    this.registerInclusionResolver("sites", this.sites.inclusionResolver);
  }
}
