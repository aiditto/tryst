# The AIDITTO tryst
This AIDITTO tryst platform includes frontend interfaces and backend APIs for the AIDITTO tryst. Read more about each application in their respective project folders.

## Backoffice and Tryst
The [backoffice](frontend/backoffice) is the primary administrator interface for the content publisher, to login and collaborate with each other and manage their created Sites, with all the content that is to be presented on them.

These Sites are publicly facing webpages, enabling our customers to publish information to, and ask for help from, visitors to the Site. They are rendered by the [tryst](frontend/tryst) component (meeting place).

Both of these frontends use the same backend API, [loopback (aka api/v1)](backend/loopback), is built strictly as an API that these two frontends communicate with. [Restify (aka api/v0)](backend/restify) is a remnant of our first take on this platform.

🚀
