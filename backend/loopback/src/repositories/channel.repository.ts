/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Getter, inject} from "@loopback/core";
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from "@loopback/repository";
import {DbDataSource} from "../datasources";
import {Channel, ChannelRelations, Demand} from "../models";
import {DemandRepository} from "./demand.repository";

export class ChannelRepository extends DefaultCrudRepository<Channel, typeof Channel.prototype.id, ChannelRelations> {
  public readonly demands: HasManyRepositoryFactory<Demand, typeof Channel.prototype.id>;

  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("DemandRepository") protected demandRepositoryGetter: Getter<DemandRepository>
  ) {
    super(Channel, dataSource);
    this.demands = this.createHasManyRepositoryFactoryFor("demands", demandRepositoryGetter);
    this.registerInclusionResolver("demands", this.demands.inclusionResolver);
  }
}
