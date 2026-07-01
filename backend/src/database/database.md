# Documentation for The Database Control Code

## Known Issues

### `MongoServerSelectionError: getaddrinfo ENOTFOUND mongo`

Issue no longer applies. Connections are attempted to both "mongodb://mongo:27017" and "mongodb://localhost:27017".