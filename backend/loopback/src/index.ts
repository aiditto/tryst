/*---------------------------------------------------------------------------------------------
 *  Copyright (c) AIDITTO AB. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import dotenv from "dotenv";
import {App, ApplicationConfig} from "./application";

const p = require("../package.json");
export * from "./application";

export async function main(options: ApplicationConfig = {}) {
  dotenv.config();

  const app = new App(options);

  await app.boot();
  await app.start();

  const url = app.restServer.url;

  console.log(`Server is running at ${url}`);

  return app;
}

if (require.main === module) {
  const version = p.version.split(".").shift();
  // Run the application
  const config = {
    rest: {
      basePath: "/api/v" + version,
      port: +(process.env.PORT ?? 3000),
      host: process.env.HOST,
      // The `gracePeriodForClose` provides a graceful close for http/https
      // servers with keep-alive clients. The default value is `Infinity`
      // (don't force-close). If you want to immediately destroy all sockets
      // upon stop, set its value to `0`.
      // See https://www.npmjs.com/package/stoppable
      gracePeriodForClose: 5000, // 5 seconds
      openApiSpec: {
        // useful when used with OpenAPI-to-GraphQL to locate your application
        setServersFromRequest: true,
      },
    },
  };
  main(config).catch(err => {
    console.error("Cannot start the application.", err);
    process.exit(1);
  });
}
