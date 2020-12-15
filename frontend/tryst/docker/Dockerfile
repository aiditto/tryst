FROM node:lts AS build

COPY . /build
WORKDIR /build

RUN apt-get update && apt-get install -y make rsync && make build-prod

FROM pierrezemb/gostatic

COPY --from=build /build/build /srv/http/
COPY docker/headerConfig.json /config/headerConfig.json

CMD [ "-header-config-path=/config/headerConfig.json", "-fallback=/index.html"]