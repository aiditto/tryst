/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {inject} from "@loopback/core";
import {DefaultCrudRepository} from "@loopback/repository";
import {DbDataSource} from "../datasources";
import {Response, ResponseRelations} from "../models";

export class ResponseRepository extends DefaultCrudRepository<
  Response,
  typeof Response.prototype.id,
  ResponseRelations
> {
  constructor(@inject("datasources.db") dataSource: DbDataSource) {
    super(Response, dataSource);
  }
}
