# Milestone 2 Test Plan

## Purpose

This test plan supports the Milestone 2 submission for SmartAPT. It describes how to verify Docker deployment, frontend availability, backend startup, and the current state of application functionality.

## Setup

1. Ensure Docker Desktop is installed and running.
2. Clone this repository from GitHub.
3. Copy the provided environment template:

```bash
cp frontend/.env.example frontend/.env
```

4. Place the actual `.env` file from Canvas into `frontend/.env` if needed.

## Manual Tests

### 1. Docker deployment

Steps:

1. Open a terminal and change to the frontend folder:

```bash
cd frontend
```

2. Start the containers:

```bash
docker compose up --build
```

3. Verify the Docker Compose start process finishes without errors.
4. Confirm the following containers are running:
   - frontend
   - backend
   - mongo

Expected result:

- The containers start successfully and remain healthy.

### 2. Frontend availability

Steps:

1. Open a browser and navigate to `http://localhost:5173`.
2. Confirm the frontend page loads.

Expected result:

- The app page is visible at the expected host port.

### 3. Backend availability

Steps:

1. Open a browser or use curl to access `http://localhost:3000`.
2. Confirm the backend responds or is listening.

Expected result:

- The backend service is reachable and does not immediately fail to connect.

### 4. Environment file check

Steps:

1. Verify `frontend/.env.example` exists in the repository.
2. Confirm `frontend/.env` is not committed to GitHub.

Expected result:

- Only `.env.example` is tracked in Git.
- The real `.env` file is kept private and uploaded to Canvas as required.

## Automated Tests

At present, there are no automated unit or integration tests configured in this branch. The following commands can be used if tests are added later:

```bash
cd frontend
npm test
```
