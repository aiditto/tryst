#--------------------------------------------------------------------------------------------
# Copyright (c) AIDITTO AB. All rights reserved.
# Licensed under the MIT License. See LICENSE in the project root for license information.
#--------------------------------------------------------------------------------------------

# Check out https://hub.docker.com/_/node to select a new base image
FROM node:10-slim AS build

#COPY build/ /srv/http/

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY --chown=node package*.json ./

RUN npm install

# Bundle app source code
COPY --chown=node . .

RUN npm run build

FROM node:10-slim

WORKDIR /home/node/app

COPY --from=build /home/node/app/dist ./dist
COPY --from=build /home/node/app/node_modules ./
COPY --from=build /home/node/app/package*.json ./
RUN npm install

USER node

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0 PORT=8080

EXPOSE ${PORT}
CMD [ "/bin/sh", "-c", "npm run migrate && node ." ]
