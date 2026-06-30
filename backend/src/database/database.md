# Documentation for The Database Control Code

## Known Issues

### `MongoServerSelectionError: getaddrinfo ENOTFOUND mongo`

#### Cause

This error refers to the constant `MONGODB_URL` in src/database/databaseConstants.ts not being set correctly. It is dependent on the "MONGODB_URL" environment variable. 

#### Solution

The solution depends on whether the backend server code (i.e. src/server.ts) is intended to be run locally or in Docker. It assumes that MongoDB is running in a Docker container. 

1. If server.ts is intended to be run locally (by using a node or npx command such as `npx tsx server.ts`):
	- Set the environment variable MONGODB_URL to mongodb://localhost:27017 prior to running server.ts.
2. If server.ts is intended to be run in a Docker container (by using `docker compose up`):
	- Ensure that the following line is present in the .env file (located in the root folder of the repository), and add it if it is absent:
		```bash
		MONGODB_URL=mongodb://mongo:27017
		```

The `MONGODB_URL` variable in the code will set itself to the value of the MONGODB_URL environment variable. **The default value of the MONGODB_URL being mongodb://mongo:27017 is intentional, so that the code runs on Docker with minimal setup required.**