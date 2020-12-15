# Loopback authentication notes and links

- Interceptors
  - [The return from Azure needs to be handled with an interceptor](https://loopback.io/doc/en/lb4/Express-middleware.html#use-express-middleware-as-interceptors-for-controllers)
  - [Example Google login interceptor (from example)](https://github.com/strongloop/loopback-next/blob/master/examples/passport-login/src/authentication-interceptors/google.interceptor.ts)
  - [How to create an interceptor](https://loopback.io/doc/en/lb4/Express-middleware.html#use-lb4-interceptor-command-to-create-interceptors-for-express-middleware)

### Create the loopback interceptor

```
loopback % lb4 interceptor
? Interceptor name: AzureAdStrategy
? Is it a global interceptor? Yes
? Group name for the global interceptor: ('') middleware
```

### Create the Graph API User Invitation
  -   * [Get Access Token Process](https://docs.microsoft.com/en-us/graph/auth-v2-user#token-response)
  -  * [Create Invitation From Graph API](https://docs.microsoft.com/en-us/graph/api/invitation-post?view=graph-rest-1.0&tabs=http)
