# Back-End Test Automation

## Requirements

Certify that the following line is present in the `.env` file at the root folder of the repository:

```bash
COMPOSE_PROFILES=production
```

(For more information of what this means, read ["Implemetation Notes"](#implementation-notes) below).

## Running Tests

To run the back-end tests, run the docker compose command with the `--profile test` attribute, as follows:

```bash
docker compose --profile test up --build
```

This runs the MongoDB container as well as a second back-end container called “backend-test”. This container will run the back-end Mocha tests (i.e. all files with names ending in `.test.ts`) specified in the subfolders of the `backend/test` folder. 

## Writing Tests

Tests can be written using Mocha, Chai and Chai as Promised. Refer to their documentations for more information.

## Implementation Notes

This method of running tests is based on Docker Compose profiles, defined such that the regular “deployment to production” pipeline (i.e. running `docker compose up --build` to create the three production containers "backend", "frontend" and "mongo") uses the same command as before test automation was added. For more information on profiles, see https://docs.docker.com/compose/how-tos/profiles/. Importantly, the profile used by Docker Compose can either be passed with the `--profile` attribute or by setting the COMPOSE_PROFILES envrionment variable.

Two Docker Compose profiles were created: "production" and "test", where the former creates the aforementioned three production containers, and is set as the default profile to be used by Docker Compose by means of the COMPOSE_PROFILES environment variable set in the `.env` file. Running Docker Compose with the `--profiles` attribute overrides the environment variable, meaning that specifying `--profile test` prevents the containers associated to the "production" profile from running.

Note that the "mongo" container is run on either configuration, as it uses no profiles. This means that tests can query and update the MongoDB database as if the database was deployed in production.

To avoid potential conflicts with the exposed ports, the "backend-test" container exposes port 3001. Nevertheless, it is best to delete the container stack created for testing before deploying to production.

---

For help on testing and with this Docker Compose configuration, contact Gale.