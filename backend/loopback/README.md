# The API

This is the main API that our frontend interfaces communicate with. It’s built in TypeScript on the [Loopback framework](http://loopback.io/).

Authentication is done with Azure Active Directory’s single sign-on.

## Installation and Setup

1. For local development (**recommended**), install PostgreSQL if you don’t already have it, and create a new database for this application
1. Install Loopback globally using `npm install -g loopback`
1. Install the other dependencies using `npm install` from this directory
1. Copy the [.env-template](https://github.com/aiditto/core/blob/master/backend/loopback/.env-template) file to a new file called `.env`, and replace any configuration in the new file that needs to match your environment
1. Run `npm run migrate` from this directory to run all the database migrations
1. To be able to login, first make sure your email is registered in Active Directory. Then add that email, together with its oid (Object ID, found under your AD account [here](https://portal.azure.com/#blade/Microsoft_AAD_IAM/UsersManagementMenuBlade/MsGraphUsers)) as a new row to the newly created `user` table.
1. In order to test Single Sign On functionality, it is recommended to run the project in debug mode.

## Run Project locally

- Navigate to loopback folder and run
  ```sh
  $ npm run build:watch
  ```
  It will compile and build the project in watch mode.
- Open Debug Mode and Launch the configuration, it will start running the project at port 8080. And you can see this message in Debug Console of VSCode.
  ```sh
  $ Server is running at http://[::1]:8080/api/v1
  ```
  Alternatively run `npm start` from your terminal.

## Test SSO with Local Client Project

In order to test SSO functionality with the application running locally, You must set `FRONT_END_URL_LOCAL` variable value to your local client url inside .env file under loopback folder. This is needed in the essence of redirecting the response back to local client application after SSO process is done.

## To create a docker container

```
docker build -t aiditto/services -f docker/Dockerfile .
```
