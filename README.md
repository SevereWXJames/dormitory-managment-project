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

This project is deployable with Docker Desktop using the root `docker-compose.yml` file.

### Required setup

1. In the repository root, place the actual `.env` file provided by Canvas.
2. Do not commit the real `.env` file to GitHub.
3. The frontend uses `frontend/.env.example` only as a local development reference. The frontend container build generates its own `frontend/.env` from the `VITE_API_URL` build argument.

### Build and run

From the repository root:

```bash
docker compose up --build
```

### App URLs

- Frontend: http://localhost:5173
- Backend base URL: http://localhost:3000
- MongoDB: localhost:27017

> **Important:** Do not store `.env` in GitHub. Only `.env.example` is tracked in this repo.

## Milestone 2 Functionality

This milestone delivers the initial functional prototype (MVP) of SmartAPT, bridging user management, shared facility scheduling, and maintenance coordination. Below is the explicit breakdown of functionality state and classification as required by M2 criteria:

### Feature Breakdown & Implementation Status

| Feature Name & Scope | Feature Type | Status in M2 | Description & Technical Implementation |
| :--- | :--- | :--- | :--- |
| **Dockerized Stack Orchestration** | Standard | **Fully Functional** | Frontend (Vite/Nginx), Backend (Node.js/Express), and Database (MongoDB) are containerized and fully networked via Docker Compose. |
| **Role-Based Authentication Gateway** | Standard | **Partially Functional** | Supports form submission. Currently accepts valid email/password structures and routes user sessions to respective Resident/Manager dashboards. Passwords are encrypted on transit/storage. |
| **Shared Facilities Scheduling System** | **Non-Trivial** | **Prototype / Mocked UI** | Core business logic layer checks for time-slot conflicts. Handles "Reserve" actions for available devices (e.g., Laundry Machines) and enforces state locks during active bookings. |
| **Maintenance Request Pipeline** | Standard | **Partially Functional** | Residents can populate forms with categories (Plumbing, HVAC, Electrical) and set "Emergency" priorities. Building Managers can view the aggregated list with unit numbers and mutate ticket statuses. |
| **Broadcast Notice Board** | Standard | **Partially Functional** | Building managers can create, edit, and publish multi-line notices. Enforces "Unread" tracking on the database level for residents until opened. |
| **Apartment Identity Verification** | **Non-Trivial** | **Backend Logic Active** | Implements the unique room validation mechanic. Apartment profiles are strictly leveraged as a backend verification gate rather than a public directory page to protect privacy. |

---

### Feature Usage Instructions (How to Use & Demo)

To evaluate the prototype operations post-Docker startup, follow these interface pathways:

#### 1. Authentication & Role Navigation
- Navigate to `http://localhost:5173`. 
- Enter any standard email format (e.g., `resident@smartapt.com` or `manager@smartapt.com`) and password.
- **Resident Landing:** Redirects to the resident dashboard containing the facility scheduling grid, unread announcement list, and personal maintenance log.
- **Building Manager Landing:** Grants administrative access to device configurations and incoming maintenance ticket triage panels.

#### 2. Managing Shared Facilities (Admin & Resident Flow)
- **As Admin:** Access the "Facilities" tab. Click **"Add Device"** to append new infrastructure (e.g., "Dryer B") or toggle the **"Available"** checkbox via **"Edit Device"** to manually take a broken machine offline.
- **As Resident:** Access the "Facilities" tab to view real-time availability. If a device is unreserved, click **"Reserve"** and specify the desired date/time block.

#### 3. Maintenance Reporting & Triage
- **As Resident:** Click **"Create Request"**, select a category from the dropdown, specify your room location/issue description, and hit confirm to dispatch.
- **As Admin:** Open the main "Maintenance" view to audit incoming requests. Select an entry and click **"Edit"** to escalate the status lifecycle from `New` $\rightarrow$ `Contractor Requested` $\rightarrow$ `Resolved`.

#### 4. Publishing Announcements
- **As Admin:** Under the "Notices" page, use **"Create Notice"** to broadcast building-wide updates. Use **"Edit"** to modify existing announcements, which automatically forces a database reset to mark the notice as "Unread" for all resident feeds.

---

## Standard Features (Design Alignment)

In alignment with our Milestone 1 Design Specification, this submission fulfills the following structural deliverables:
* **Decoupled Service Architecture:** Complete programmatic separation of front-end client components and back-end RESTful API routers.
* **Persistent Document Storage:** Integration of official MongoDB images ensuring data mutations (bookings, notice posts, user credentials) survive container lifecycles.
* **Environment Sandboxing:** Strict environment decoupling via `.env.example` configurations, keeping sensitive parameters out of source control.

## Test Plan

Detailed test instructions are available in `doc/test-plan.md`.

### What the TA should verify

- Docker deployment works from the `frontend` folder.
- Frontend is accessible at `http://localhost:5173`.
- Backend service starts successfully on `http://localhost:3000`.
- `.env` is not stored in GitHub and `.env.example` is present.

## Bug Tracking

Bugs are tracked as GitHub Issues in this repository. The issue tracker contains the date, creator, expected behavior, actual behavior, reproduction steps, and status.