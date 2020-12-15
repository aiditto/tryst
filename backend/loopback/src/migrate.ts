/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import {App} from "./application";

export async function migrate(args: string[]) {
  const existingSchema = args.includes("--rebuild") ? "drop" : "alter";
  console.log("Migrating schemas (%s existing schema)", existingSchema);

  const app = new App();
  await app.boot();
  await app.migrateSchema({existingSchema});

  // Connectors usually keep a pool of opened connections,
  // this keeps the process running even after all work is done.
  // We need to exit explicitly.
  process.exit(0);
}

migrate(process.argv).catch(err => {
  console.error("Cannot migrate database schema", err);
  process.exit(1);
});
