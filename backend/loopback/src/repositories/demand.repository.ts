/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {Getter, inject} from "@loopback/core";
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from "@loopback/repository";
import {DbDataSource} from "../datasources";
import {Demand, DemandRelations, Response} from "../models";
import {ResponseRepository} from "./response.repository";

export class DemandRepository extends DefaultCrudRepository<Demand, typeof Demand.prototype.id, DemandRelations> {
  public readonly responses: HasManyRepositoryFactory<Response, typeof Demand.prototype.id>;

  constructor(
    @inject("datasources.db") dataSource: DbDataSource,
    @repository.getter("ResponseRepository") protected responseRepositoryGetter: Getter<ResponseRepository>
  ) {
    super(Demand, dataSource);
    this.responses = this.createHasManyRepositoryFactoryFor("responses", responseRepositoryGetter);
    this.registerInclusionResolver("responses", this.responses.inclusionResolver);
  }
}
