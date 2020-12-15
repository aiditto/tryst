# To build a docker image

You need to have copied the docker static build directory to the docker folder as "build"

Then build a docker image with below command!

```
docker build -t aiditto/portal .
```

Default is with Access-Control-Allow-Origin: *

```
docker run -p 8043:8043 aiditto/portal -header-config-path /config/headerConfig.json -append-header Access-Control-Allow-Origin:"https://dev.aiditto.se"
```
