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
residents and building managers. The goal is to let residents book shared
facilities, submit maintenance requests, view building notices, and manage
facility status data in one place.

## Milestone 2 Branch

- Branch: `Milestone2` (or the submitted branch link for this milestone)
- This README documents the Milestone 2 submission state and Docker deployment.

## Docker Instructions

This project is deployable with Docker Desktop using the `frontend/docker-compose.yml` setup.

### Required setup

1. In the repository root, copy the example environment file:

```bash
cp frontend/.env.example frontend/.env
```

2. Do not commit `frontend/.env` to GitHub.
3. Upload the actual `.env` file to Canvas as required by the assignment.

### Build and run

```bash
cd frontend
docker compose up --build
```

### App URLs

- Frontend: http://localhost:5173
- Backend base URL: http://localhost:3000
- MongoDB: localhost:27017

> **Important:** Do not store `.env` in GitHub. Only `.env.example` is tracked in this repo.

## Milestone 2 Functionality

### Current implementation

- Dockerized frontend, backend, and MongoDB services.
- `frontend/docker-compose.yml` builds and launches:
  - frontend service on host port `5173`
  - backend service on host port `3000`
  - MongoDB service on host port `27017`
- Frontend build uses `frontend/Dockerfile` and serves the app via Nginx.
- Backend build uses `backend/Dockerfile` and starts the Node service.
- `.env.example` documents required environment variables.

### Usage

1. Start the app with Docker Desktop using the command above.
2. Open `http://localhost:5173` in a browser.
3. Backend service is available at `http://localhost:3000`.

### Notes on current status

- The current frontend is an initial Vite scaffold.
- The backend currently runs as a placeholder service.
- Core SmartAPT functionality is planned but not yet fully implemented in this branch.

## Standard Features

The Milestone 2 submission is intended to demonstrate the following standard features:

- Separate frontend and backend services.
- Docker Compose orchestration for the full stack.
- Environment variable management with `.env.example`.
- Initial deployment-ready application structure.

## Test Plan

Detailed test instructions are available in `doc/test-plan.md`.

### What the TA should verify

- Docker deployment works from the `frontend` folder.
- Frontend is accessible at `http://localhost:5173`.
- Backend service starts successfully on `http://localhost:3000`.
- `.env` is not stored in GitHub and `.env.example` is present.

## Bug Tracking

Bugs are tracked as GitHub Issues in this repository. The issue tracker contains the date, creator, expected behavior, actual behavior, reproduction steps, and status.