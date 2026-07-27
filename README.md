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

## Milestone 4 Branch

- Branch: `Milestone4` (or the submitted branch link for this milestone)
- This README documents the Milestone 4 submission state and Docker deployment.
- The Milestone 2 and Milestone 3 sections below remain for comparison with prior-stage functionality.

## Docker Instructions

This project is deployable with Docker Desktop using the root `docker-compose.yml` file.

### Required setup (Docker instructions)

1. In the repository root, place the actual `.env` file provided by Canvas.

### Build and run

From the repository root:

```bash
docker compose up --build
```

Use the same command again after a code change to rebuild the containers. 
To stop and remove the running containers:

```bash
docker compose down
```

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

## Resident-facing changes in Milestone3 branch

Compared with the Milestone 2 branch, the current branch is less demo-like and more data-driven for resident workflows. The main differences are:
- Resident login and route handling now follow the same role-aware flow as the rest of the app, rather than relying on a single generic landing page.
- Facility booking, maintenance submission, and notice viewing are now backed by the shared backend and sample data, so they can be exercised in a more realistic local flow.
- The credits page now exposes balance and history information in a more structured way, although the checkout experience is still a mock/demo flow rather than a real payment integration.
- The resident settings area now includes account/profile and notification-related sections, but the notification controls remain visual placeholders rather than persisted preferences.

### Non-admin feature status and limitations 

The following parts are visible in the frontend but should not be treated as fully implemented product features yet:
- Notification center and push notification behavior: the UI can show notification-related elements, but there is no real inbox, delivery pipeline, or persistent notification state.
- Notice read/unread flow: the resident notices page is available, but the read-state behaviour and follow-up alerts are still limited and should be tested as a partial workflow rather than a complete notification system.
- Credit checkout and payment processing: the form is present and can be exercised locally, but it is still a mock/demo flow and should not be validated as a live payment integration.
- Some dashboard cards, help text, and settings panels are still static or demo-oriented and should be considered UI placeholders until they are backed by real data or persistence.

### How to verify Milestone 3 functionality

#### Residents:
1. Start the stack with `docker compose up --build` and open `http://localhost:5173`.
2. Create an account by clicking on the sign-up link for residents located below the login-form. 
3. Enter appropriate values in the fields and click the sign-up button.
4. To log in back to your newly create account, use the same username, email, and password that you chose to create the account. 
5. After signing up for the first time or after logging back in, verify the resident dashboard pages for bookings, maintenance, notices, credits, and account settings. Keep in mind that notification-related widgets and any static help/demo content are not yet full features.

#### Admin:
1. Create a new account by clicking on the sign-up link for admins located below the login-form.
2. Similarly, enter appropriate values in the fields and click on the sing-up button. Ensure that the email and the username are different than the one you used to sign-in as a Resident.
3. After signing up as an admin and verify the admin dashboard, facilities, maintenance, notices, residents, access codes, and settings pages.
4. After creating an adnin account, you can continue to log back in as an admin using the login form.

5. Verify that notice visibility, request status updates, and resident/admin navigation work as expected in the running app.

6. To confirm that role authorization and authentication are working as intended, you can try copying one of the page URIs specific to the admin interface. Then log out and or log back in as a resident and copy and paste the uri link in the address bar.

## Milestone 4 Functionality

This milestone focuses on polishing the existing resident experience and tightening authentication reliability. Compared with the Milestone 3 state, the work prioritizes correctness and product clarity rather than introducing a large number of new feature areas.

### Scope changes

- No major new product domain was added in this milestone; the effort was concentrated on refining features already present in the Milestone 3 branch.
- The resident-facing experience was simplified by removing static UI elements that were not backed by a fully implemented workflow.
- Notices are being removed as we do not plan to implement them due to them adding little to the end user experience and due to lack of time.
- Rooms and residents are being removed as they serve no purpose in the current state of the application.

### New functionality and improvements

- Resident view cleanup: the resident dashboard and navigation now avoid surfacing notices and other static/demo components that were not fully implemented, making the UI more aligned with the current backend capabilities.
- Admin login page refactor: the admin-facing authentication experience was cleaned up and reorganized so the login/sign-up flow is more consistent with the rest of the app and easier to navigate.
- Stronger authentication validation: signup now rejects invalid email formats, and login requires the provided username and email to belong to the same account before access is granted.
- Account identity enforcement: user registration now enforces a unique email address per account rather than relying on username uniqueness alone, which improves account creation reliability and prevents duplicate accounts from being created with the same email.
- Clearer auth feedback: backend authentication responses now return specific validation messages so the frontend can show more precise login/signup error feedback, including helpful guidance for malformed email addresses.
- Middleware-based auth refactor: role-based authorization checks were moved into the middleware layer so the auth routes follow the existing middleware pattern more cleanly, with protected admin signup handling routed through the established auth middleware flow.
- Frontend auth form improvements: the login and signup forms were updated to surface backend validation errors directly in the UI and to present consistent, user-friendly messages for invalid email input.
- Admin account creation refactor: admin account creation has been moved to the admin only pages, to prevent unauthorized users creating admin accounts.
- IoT reservation messages: an IoT Response messages has been added when a service is booked.
- Reservation slot autogeneration: reservations slots are autogenerated a set number of days ahead at a set time every day.
- Reservation slot removal: old reservation slots are cleaned up at the same time.
- Reservation slot sorting: reservation slots are now filtered based on being in the past, and are ordered by time and date in the UI.
- Authentication refresh tokens: refresh tokens have been added to the authentication token system.
- Datatype refactor: backend datatypes have been streamlined to prevent type mismatch.


### Verification notes

- The updated auth behavior was verified through live backend requests for invalid signup and mismatched login attempts.
- The frontend build was also verified successfully after the form and error-handling updates.

## Standard Features (Design Alignment)

In alignment with the Milestone 1 design and the current M3 state, the submission includes the following structural deliverables:
* **Decoupled Service Architecture:** Front-end pages and back-end routers are separated into distinct application layers.
* **Persistent Document Storage:** MongoDB-backed collections store bookings, notices, maintenance requests, and user-related data for local development and testing.
* **Environment Sandboxing:** `.env.example` is available as a template, while the real environment file stays private and out of source control.
* **Role-Based Access Control:** Resident and admin users are routed through protected pages and role-aware middleware.
* **Payment / Credit Flow:** The current implementation includes a mock-style credits flow for demo purposes; it does not yet integrate a production payment provider.

## Test Plan

Detailed test instructions are available in `doc/test-plan.md`.

## XSS Report

XSS Security Assessment - conduct an XSS scan of your application and report the results, prioritizing and addressing any vulnerabilities.

### List of Tests For Each Page:
- #### Login:
    - Test 1: No-SQL injection:
      - Setup:
        - Create an account through the sign-up link
        - Fill out any required fields.
        - Record username, email and password, used to create the account.
      - Execution:
        - Input the username and email used to create the account.
        - In the password field, input: “${ne: null}”
      - Expected Result:
        - The login request should be rejected and the client unable to gain access to the dashboard.
- #### Sign Up as Resident:
    - Test 1: Script Injection:
      - Setup:
        - Navigate to the sign-up link.
        - Fill out all required fields, but leave the name field blank.
        - In the name field, input “<script>alert(“1”)</script>.
      - Execution:
        - Submit the information in the signup form
      - Expected Result:
        - The user will successfully sign up.
        - No alert dialog message with “1” should appear.
- #### Maintenance Request Page
  - Test 1: Script Injection:
    - Setup:
      - Create an account or login using the instructions in the previous test above.
      - Navigate to the Maintenance Requests page.
      - Fill out the fields using the drop-down options.
      - Input “<script>alert("5")</script>” in any text input field
    - Execution:
      - Submit the information in the form
    - Expected Result:
      - The request will successfully be submitted.
      - No alert dialog message with “5” should appear.
- #### Credits Amount Page
  - Test 1: Script Injection:
    - Setup:
      - Create an account or login using the instructions in the previous test above.
      - Navigate to Credits page.
      - Input a number in the “amount” field.
      - Input “<script>alert("6")</script>” in any text input field
    - Execution:
      - Submit the information in the form
    - Expected Result:
      - The balance will be successfully updated by whatever amount the client chose.
      - No alert dialog message with “6” should appear.
      
#### Alerts (To be resolved):
- CSP Header not set.
- 8-medium risks identified by ZAP.
- 7-low risks identified by ZAP.


### What the TA should verify

- Docker deployment works from the `frontend` folder.
- Frontend is accessible at `http://localhost:5173`.
- Backend service starts successfully on `http://localhost:3000`.
- `.env` is not stored in GitHub and `.env.example` is present.

## Bug Tracking

Bugs are tracked as GitHub Issues in this repository. The issue tracker contains the date, creator, expected behavior, actual behavior, reproduction steps, and status.
