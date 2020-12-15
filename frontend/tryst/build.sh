#!/bin/sh

apt-get -y install rsync
make
make deploy

## These build the static react application that can be served from build/
## Deploys to the same location once built (takes a few minutes though)
#make build-static
#make deploy

