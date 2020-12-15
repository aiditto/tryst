/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {inject, lifeCycleObserver, LifeCycleObserver} from "@loopback/core";
import {juggler} from "@loopback/repository";

const databaseConfig = JSON.parse(Buffer.from(process.env.DB_CONFIG ?? "", "base64").toString("ascii"));
const config = {
  name: "db",
  connector: "postgresql",
  host: databaseConfig.host,
  port: databaseConfig.port,
  user: databaseConfig.user,
  password: databaseConfig.password,
  database: databaseConfig.db,
  charset: "utf8",
};
delete process.env.DB_CONFIG;

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver("datasource")
export class DbDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = "db";
  static readonly defaultConfig = config;
  constructor(
    @inject("datasources.config.db", {optional: true})
    dsConfig: object = config
  ) {
    super(dsConfig);
  }
}
