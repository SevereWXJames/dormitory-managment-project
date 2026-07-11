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

## Milestone 3 Branch

- Branch: `Milestone3` (or the submitted branch link for this milestone)
- This README documents the Milestone 3 submission state and Docker deployment.
- The Milestone 2 section below remains for comparison with prior-stage functionality.

## Docker Instructions

This project is deployable with Docker Desktop using the root `docker-compose.yml` file.

### Required setup (Docker instructions)

1. In the repository root, place the actual `.env` file provided by Canvas.
2. Do not commit the real `.env` file to GitHub.
3. The frontend uses `frontend/.env.example` only as a local development reference. The frontend container build generates its own `frontend/.env` from the `VITE_API_URL` build argument.

### Build and run

From the repository root:

```bash
docker compose up --build
```

Use the same command again after a code change to rebuild the containers. To stop the stack, press Ctrl+C in the terminal that is running Docker Compose.

### App URLs

- Frontend: http://localhost:5173
- Backend base URL: http://localhost:3000
- MongoDB: localhost:27017

> **Important:** Do not store `.env` in GitHub. Only `.env.example` is tracked in this repo.

### Admin access and testing

The current M3 branch includes protected admin routes for the building-manager experience. To test the admin experience:

1. Open the app at http://localhost:5173 and navigate to the login page.
2. Create an admin account through the admin sign-up flow at /admin-signup, or use an existing admin account from the seeded sample data if your local environment includes it.
3. After login, the app should route an admin user to the admin dashboard at /admin/dashboard.
4. If you want to confirm access control, sign in as a resident user and verify that admin-only routes are blocked.

> The current admin experience is role-based. The app should not rely on the email containing the word "admin" to grant access.

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

## Milestone 3 Functionality

This milestone documents the near-submittable Milestone 3 branch state. It builds on the Milestone 2 prototype by adding a building manager admin console, improved role-based auth, and richer manager/resident workflows.

### Feature Breakdown & Implementation Status

| Feature Name & Scope | Feature Type | Status in M3 | Description |
| :--- | :--- | :--- | :--- |
| **Admin Management Console** | Non-Trivial | **Partially implemented** | Protected admin routes and manager-facing pages are present for dashboard, facilities, maintenance, notices, residents, access codes, settings, and help. Some screens are still UI-focused and should be treated as M3 work-in-progress. |
| **Resident Role Dashboard** | Standard | **Implemented** | Resident-facing pages for bookings, maintenance requests, notices, credits, settings, and help are available. |
| **Role-Based Authentication / Authorization** | Standard | **Implemented** | Login, admin signup, protected routes, and role validation are wired through JWT-based auth middleware. |
| **Facility & Booking Management** | Standard | **Partially implemented** | Resident booking flows and admin facility views exist, but some interaction details and management workflows are still being refined. |
| **Maintenance Request Triage** | Standard | **Implemented** | Residents can submit requests and managers can review/update request status. |
| **Notice / Announcement Management** | Standard | **Partially implemented** | Manager notice pages and resident notice views exist; unread/read behavior should be verified manually during review. |
| **Backend / Docker Stability** | Standard | **Implemented** | Docker Compose runs MongoDB, backend, frontend, and MQTT infrastructure reliably for local development. |

### How to verify Milestone 3 functionality

1. Start the stack with `docker compose up --build` and open `http://localhost:5173`.
2. Create and Log in as a resident and verify the resident dashboard pages for bookings, maintenance, notices, and account settings.
3. Create and log in as an admin and verify the admin dashboard, facilities, maintenance, notices, residents, access codes, and settings pages. (after create account, both resident and admin account can login in the http://localhost:5173/login page)
4. Confirm admin-protected routes require an admin role and correctly deny unauthorized access.
5. Verify that notice visibility, request status updates, and resident/admin navigation work as expected in the running app.

## Standard Features (Design Alignment)

In alignment with the Milestone 1 design and the current M3 state, the submission includes the following structural deliverables:
* **Decoupled Service Architecture:** Front-end pages and back-end routers are separated into distinct application layers.
* **Persistent Document Storage:** MongoDB-backed collections store bookings, notices, maintenance requests, and user-related data for local development and testing.
* **Environment Sandboxing:** `.env.example` is available as a template, while the real environment file stays private and out of source control.
* **Role-Based Access Control:** Resident and admin users are routed through protected pages and role-aware middleware.
* **Payment / Credit Flow:** The current implementation includes a mock-style credits flow for demo purposes; it does not yet integrate a production payment provider.

## Test Plan

Detailed test instructions are available in `doc/test-plan.md`.

### What the TA should verify

- Docker deployment works from the `frontend` folder.
- Frontend is accessible at `http://localhost:5173`.
- Backend service starts successfully on `http://localhost:3000`.
- `.env` is not stored in GitHub and `.env.example` is present.

## Bug Tracking

Bugs are tracked as GitHub Issues in this repository. The issue tracker contains the date, creator, expected behavior, actual behavior, reproduction steps, and status.