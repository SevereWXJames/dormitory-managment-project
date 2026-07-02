# Documentation for The Database Control Code

## Known Issues and Solutions

### Database initialization takes a long time (over five seconds) to complete.

#### Issue

When running the back-end server (server.ts), it takes over five seconds for the `Database.create(): Succesfully connected to…` message to appear.

#### Solution

Set an environment variable called MONGODB_URL_DEFAULT to one of the following values, depending on where the server is running:

1. If the server is running locally (e.g. by using the command `npx tsx server.ts`):
	- Set `MONGODB_URL_DEFAULT=mongodb://localhost:27017`
2. If the server is running in Docker:
	- Set `MONGODB_URL_DEFAULT=mongodb://mongo:27017`

This can be done directly on the terminal or in the .env file present in the repository root.

#### Explanation

The Database.create() function, which is responsible for creating the connection between the Mongoose instance of the exported "database" object (from /src/database/database.ts) attempts to connect to the MongoDB database using one of three URLs, in the provided order:

1. The URL specified in the MONGODB_URL_DEFAULT environment variable;
2. mongodb://mongo:27017; and
3. mongodb://localhost:27017.

This is done to avoid the output of errors regardless of the running environment and of whether MONGODB_URL_DEFAULT is set.

The timeout for each connection attempt can be adjusted in the create() function in src/databas/database.ts. It has been initially set to 5000 (milliseconds).

### `MongoServerSelectionError: getaddrinfo ENOTFOUND mongo`

Issue no longer applies. Connections are attempted to both "mongodb://mongo:27017" and "mongodb://localhost:27017".