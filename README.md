# SmartAPT

## Team Information

- Team Name: Team IDK
- Project Name: SmartAPT
- Team Members:
  - Janet Song
  - James
  - Leo Qiu
  - Gale Kanegae Penha

## Project Description

SmartAPT is an apartment and facilities management platform built for residents and building managers. It helps residents book shared amenities, submit maintenance requests, monitor facility activity, and manage account-related information in one place. Building managers can review requests, manage admin workflows, and oversee system-level operations.

This README reflects the current main branch version of the project and the active repository layout rather than an older milestone-specific branch snapshot.

## Tech Stack

- Frontend: React, Vite, TypeScript, Material UI
- Backend: Node.js, Express, TypeScript
- Database: MongoDB
- Messaging: MQTT / Mosquitto
- Containerization: Docker Compose

## Repository Structure

```text
.
├── backend/              # Express API, auth, business logic, database models
├── frontend/             # React app for resident and admin interfaces
├── doc/                  # Related project documentation and test plans
├── mosquitto/            # MQTT broker configuration
├── mqtt-listener-app/    # Mock service for MQTT event listening
├── mqtt-test-app/        # Test app for simulated IoT/facility events
├── screenshots/          # UI screenshots used by docs
├── docker-compose.yml    # Full local stack setup
├── README.md             # Project overview and setup guide
└── .env.example          # Example environment template
```

## Prerequisites

- Docker Desktop or Docker Engine
- A `.env` file in the repository root with the required project environment values

> Important: Do not commit the real `.env` file to Git. Keep it local only.

## Getting Started

From the repository root, start the app with:

```bash
docker compose up --build
```

This builds and runs the frontend, backend, MongoDB, and MQTT-related services.

To stop the stack:

```bash
docker compose down
```

## Local App URLs

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- MongoDB: localhost:27017
- MQTT Broker: localhost:1883

## Default Admin Account

The project includes a seeded local admin account for development and testing:

- Email: `admin@smartapt.local`
- Password: `pass.word`

Access to admin-only routes is protected and intended for building-manager workflows.

## Main Features

- Resident login and role-based access control
- Shared facility booking and reservation scheduling
- Maintenance request submission and progress tracking
- Admin dashboard and manager-side operations
- Building notices and resident-facing communication
- Laundry credit and account-related resident functionality
- MQTT-backed mock facility / IoT integration

## Testing and Documentation

- Backend tests are under `backend/test/`
- Additional project documentation is located in `doc/`
- Test and validation notes can be found in `doc/test-plan.md`
- Design-stage documentation and milestone-by-milestone design context are preserved in the branch README history for Milestone 1 through Milestone 5.

## Development Notes

- Frontend code lives in `frontend/src/`
- Backend code and API logic live in `backend/src/`
- The project is configured for local Docker-driven development and demonstration workflows

## Quick Start Summary

```bash
# from the repo root
cp .env.example .env
# fill in the required environment values

docker compose up --build
```

Then open http://localhost:5173 to begin using the app.
