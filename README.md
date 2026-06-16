# SmartAPT

## Team Information

- Team Name: Team IDK
- Project Name: SmartAPT
- Team Members:
  - Janet Song 
  - James  
  - Zhuoyan Qiu 
  - Gale Kanegae Penha 

## Project Description

SmartAPT is an apartment building and facilities management platform for
residents and building managers. The app supports booking shared facilities,
submitting and tracking maintenance requests, publishing building notices, and
managing IoT-enabled facility status data.

## Docker Instructions

This repository includes separate containers for frontend and backend services.

### Run the app with Docker Compose

1. Copy `.env.example` to `.env`.
2. Edit `.env` if needed.
3. Run:

```bash
cd vite-project
docker compose up --build
```

### App URLs

- Frontend: http://localhost:5173
- Backend health check: http://localhost:3000/api/health

> **Do not commit** `.env` to GitHub. Upload the real `.env` file to Canvas.

## Milestone 2 Functionality

### Implemented

- Frontend and backend run in separate Docker containers.
- `docker-compose.yml` configures frontend, backend, and MongoDB.
- `Dockerfile` builds the frontend Vite app and serves it with nginx.
- `backend/Dockerfile` builds and runs a minimal backend service.
- `.env.example` documents required environment variables.
- Added Docker instructions and milestone documentation.

### Notes

- The frontend container serves the built app on host port `5173`.
- The backend container listens on host port `3000`.
- MongoDB runs in a separate container on host port `27017`.