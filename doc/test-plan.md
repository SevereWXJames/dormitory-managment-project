# Milestone 4 Test Plan (Updated from Milestone 3 Test Plan)

## Purpose

This test plan supports the Milestone 4 submission for SmartAPT. It describes how to verify Docker deployment, frontend
availability, backend startup, and the current state of application functionality.

Compared with the Milestone 3 branch, the current branch updates tests for data-backed pages, removes tests associated to removed features, and adds information on the state of test automation.

The items marked as "(M4 branch)" are new validation steps added for the M3 branch and should be prioritized when validating the admin-page changes.

## Setup

1. Ensure Docker Desktop is installed and running.
2. Clone this repository from GitHub.
3. Copy the provided environment template:

```bash
cp frontend/.env.example frontend/.env
```

4. Place the actual `.env` file from Canvas into `frontend/.env` if needed.

## Login instructions

Wherever the tests require logging in, the following login information can be used:

- For a resident: 
    - Username: test1
    - Email: test1@test.com
- For a building manager/administrator: 
    - Username: admin
    - Email: admin@smartapt.local

The password to be used for either account is the value of the SAMPLE_PASSWORD environment variable, as set in the .env file.

## Manual Tests

### M4 admin and documentation checks

- **Admin sign-up and login flow**
  - Setup: Open the app at http://localhost:5173 and navigate to the login screen.
  - Execution: Create an admin account using the admin sign-up route at /admin-signup, or use an existing admin account from the seeded sample data if available.
  - Validation: After a successful login, the user should land on the admin dashboard and be able to access admin-only pages. A resident account should not be able to access the same admin routes.

- **Admin maintenance request triage**
  - Setup: Sign in as an admin and ensure at least one maintenance request exists.
  - Execution: Open the maintenance page and update the status of an existing request.
  - Validation: The updated status is displayed in the admin view and remains after refresh.

### Resident-side checks (non-admin)

- **Resident sign-in and dashboard**
  - Setup: Open the app at http://localhost:5173 and navigate to the login screen.
  - Execution: Sign in with a resident account and confirm that the resident dashboard loads.
  - Validation: The dashboard should show resident-relevant sections such as bookings, maintenance requests, and credits. If a section is blank or static, treat it as a current limitation rather than a confirmed feature.

- **Resident facility booking**
  - Setup: Sign in as a resident and navigate to the facilities page. Click on the link below the Credit Balance. Input any 16 digits in the card number field, any date in the expiration date field, at least three digits in the scurity code field, and $5.00 in the 'amount field' and ensure that in the balance you have $5.00. Then navigate back to the facilities page.
  - Execution: Open a machine, choose a time slot, and submit a booking.
  - Validation: The booking should appear in the resident booking list or related view. If it fails, verify whether the issue is a real backend problem or a known placeholder flow.

- **Resident maintenance submission**
  - Setup: Sign in as a resident and open the maintenance page.
  - Execution: Submit a maintenance request with a category, description, and priority.
  - Validation: The request should be accepted by the app and appear in the resident/manager workflow. The new maintenance request is shown both in the UI and in the MongoDB database (which can be verified by connecting MongoDB compass to mongodb://localhost:27107/ and navigating to the MaintenanceRequests collection).

- **Credits / balance**
  - Setup: Sign in as a resident and open the credits page.
  - Execution: Review the balance and transaction history, then attempt a credit top-up using the mock form.
  - Validation: The page should display data from the current session/backend and the top-up flow should behave as a local demo path rather than a real payment checkout. The "Add Credits" form validates the card number (the input must have 16 digits), expiration date (the input must be a valid MM/YY date) and security code (the input must have between 3 and 4 digits) fields.

- **Settings / profile**
  - Setup: Sign in as a resident and open the settings page.
  - Execution: Review the account/profile information.
  - Validation: The name, email, username and phone number of the logged-in user are present and these fields are read-only.

### Non-admin features that are still not fully testable

The following frontend elements are visible in the current branch but should not be treated as complete, production-ready features:
- Payment checkout: the credits form exists, but it is still a mock/demo flow and should not be tested as a live payment integration.
- Static dashboard/help/demo content: some cards and helper copy are present for orientation but are not backed by full product logic.

### Deployment and smoke tests

#### 1. Docker deployment

Step:

1. Start the containers:
```bash
docker compose up --build
```

3. Verify the Docker Compose start process finishes without errors.
4. Confirm the following containers are running:
```bash
docker compose ps
```
    - frontend
    - backend
    - mongo
    - mosquitto

Expected result:

- The containers start successfully and remain healthy.

#### 2. Frontend availability

Steps:

1. Open a browser and navigate to `http://localhost:5173`.
2. Confirm the frontend page loads.

Expected result:

- The app page is visible at the expected host port.

#### 3. Backend availability

Steps:

1. Open a browser or use curl to access `http://localhost:3000`.
2. Confirm the backend responds or is listening.

Expected result:

- The backend service is reachable and does not immediately fail to connect.

#### 4. Environment file check

Steps:

1. Verify `frontend/.env.example` exists in the repository.
2. Confirm `frontend/.env` is not committed to GitHub.

Expected result:

- Only `.env.example` is tracked in Git.
- The real `.env` file is kept private and uploaded to Canvas as required.

## Manual Front-End Tests

### M3 admin page changes (M3 branch)

- **Admin access and navigation**
    - Setup: Start the app and sign in with an admin account.
    - Execution: Open the admin landing page / management page from the app navigation.
    - Validation: The admin-only page is visible and accessible, and non-admin users are blocked from entering it.

- **Admin maintenance request management**
    - Setup: Sign in as an admin and ensure at least one maintenance request exists.
    - Execution: Open the maintenance page, choose an existing request, and change its status (for example to "Contractor Requested" or "Resolved").
    - Validation: The status update is reflected in the UI and persists after refreshing the page.

- **Admin  facility management**
    - Setup: Sign in as an admin and open the relevant admin management page.
    - Execution: Review facility data and perform one add/edit/remove action if available.
    - Validation: The admin page updates correctly and the resulting data is shown in the UI without errors.

- **All pages:**
    - Test case 1: Style
        1) Setup: None
        2) Execution: Open any page of the web application.
        3) Validation: All UI elements are displayed with the correct style.
- **All forms:**
    - Test case 1: Form buttons
        1) Setup: None
        2) Execution: Open any form of the web application.
        3) Validation: There are two buttons for cancelling and confirming changes.
    - Test case 2: “Confirm” button function
        1) Setup: Access a form.
        2) Execution: Press the “confirm” button.
        3) Validation: Changing any value and pressing “confirm” exits the form and adds or - changes the pertinent
           information correctly.
- **Login page:**
    - Test case 1: UI Elements
        1) Setup: None
        2) Execution: Open the login page.
        3) Validation: There are three text input fields present (Username, E-mail and Password) and one button input (
           Log in)
    - Test case 2: Login function as a resident
        1) Setup: Open the login page.
        2) Execution:
            - Enter a valid username, e-mail and password combination (for M2, any username, e-mail and password
              combination is valid) in their respective fields,
            - Press the “Log in” button twice.
        3) Validation: The user should be navigated to the resident dashboard page on the second click (This is a known
           bug issue and we will fix it).
    - Test case 3: Login function as an admin
        1) Setup: Open the login page.
        2) Execution:
            - Use a valid admin account created through the admin sign-up flow, or a seeded admin account available in the local environment.
            - Enter the correct username, email, and password for that admin account.
            - Press the “Log in” button.
        3) Validation: The user should be navigated to the admin dashboard page and should be able to access admin-only screens such as the maintenance request page.
- **Settings**
  - Test case 1: Viewing user information as a Resident:
    1) Setup: Follow the instructions to log in as a Resident as detailed in Test case 2 for the Login page.
    2) Execution: Navigate to the "Settings" page using the "menu" button in the upper left hand corner.
    3) Validation: The username and email that the user has inputted should be one of the following displayed. (Name and phone number are hardcoded with default values: "Lem Lemmings" and "12345678")
- **Personal information form:**
    - As of M4, the form is implemented as read-only fields. See the corresponding tests in "Settings / Profile" above.
- **Payment information form:**
    - As of M4, the form is implemented in the front-end with field validation. See the corresponding tests in "Credits / Balance" above.
- **Shared facilities page, resident view:**
    - Test case 1: UI elements
        1) Setup: None
        2) Execution: Log in as a valid resident, then navigate to the “Facilities” page.
        3) Validation:
            - On th left, there is a list of named items corresponding to a laundry machine
            - Clicking on one of the machine options opens a dialog window with a Calendar and a Form to book a time
              slot.
    - Test case 2: Make a booking through the input form for the first time.
        1) Setup:
            - Log in as a valid resident.
            - Navigate to the "Credits" page
            - Follow the instructions detailed in the test plans for "Credits page" and ensure the balance has at least
              1 dollar worth of credits. (For M4, 1 credit costs $0.01, and booking a slot costs 5 credits)
            - Navigate to the “Facilities” page.
            - Select a machine that you wish to book. 
            - A modal window should open with a list of times.
            - Select the time you can pick. 
        2) Execution: Press the “Confirm” button.
        3) Validation:
            - A notification window should pop up, stating the success of the action. 
            - Clicking on the same machine option again, the time slot selected should be disabled.
            - The table under "Recent Bookings" should have a single row containing following information about the booking the user has inputted.
            - The credit balance on the facilities booking page should have 5 credits deducted.
            - Navigate to the "Dashboard" page. The table under "Recent Bookings" should have a single row containing following information about the
              booking the user has inputted.

    - Test case 3: Removing a booked slot.
        1) Setup:
            - Follow the instructions detailed in Test case 2.
            - Ensure that you have made at least 1 booking confirmed by the "Recent Bookings" table.
        2) Execution:
           - In the table 'Upcoming bookings' on the far right on the row should be '...' button.
           - Click on the button and click 'delete'
        3) Validation:
           - The event should be removed from the "Recent Bookings" table.
           - The slot should now be available to book once clicking on the same machine option again.
           - The balance should be refunded with 5 credits.
    - Test case 4: Viewing the status of machines.
        1) Setup: Log in as a valid resident, then navigate to the “Facilities” page.
        2) Execution:
            - Below "Check machine status", click on the button called "Cancel booking".
            - Select a machine you wish to view the status of. 
            - Click the Submit button below
        3) Validation:
            - A dialog window should pop up, stating that at the moment the machine is "idle" (For M2, responses are hardcoded)
- **Credits page, resident view:**
    - Test case 1: UI elements
        1) Setup: None.
        2) Execution: Log in as a valid resident, then navigate to the “Credits” page.
        3) Validation: The payment portal lists all previous payments made for building facilities, with their date and
           amount.
    - Test case 2: Add Credits form
        1) Setup: None.
        2) Execution: Log in as a valid resident, then navigate to the “Credits” page.
        3) Validation: In the Add Credits form, there are the following editable fields: “Card Number” (numerical),
           “Expiration Date” (date in MM/YY format), “Security code” (numerical), “Cardholder name” (text), “Amount” (numerical); and a “Pay” button that attempts to make a payment.
    - Test case 3: Accepted payment
        1) Setup: Log in as a valid resident, then navigate to the “Credits” page.
        2) Execution: Press “Pay”, fill in all mandatory fields with valid values, choose a valid card as the payment
           method, then press “Pay”.
        3) Validation: If the payment is accepted, then a new entry in the Payment History section appears with the
           provided card number, the current date and the provided amount.
    - Test case 4: Rejected payment
        - (Payment verification not implemented as of M4)
- **Maintenance requests page, resident view:**
    - Test case 1: UI elements
        1) Setup: None
        2) Execution: Log in as a valid resident, then navigate to the “Maintenance” page.
        3) The resident’s previous maintenance requests are listed, with a description, date and status (one of “New”,
           “Contractor Requested” and “Resolved”) for each item on the list. There is a “Create Request” button that
           opens the maintenance request creation form, and “Edit” and “Remove” buttons.
    - Test case 2: Maintenance request creation form
        1) Setup: Log in as a valid resident, then navigate to the “Maintenance” page.
        2) Execution: Press the “Create Request” button.
        3) Validation: The maintenance request creation form has the input fields “category” (dropdown menu, indicating
           the general type of issue e.g. “plumbing”, “HVAC”, etc.), “location” (text input), “description (text input),
           and priority (dropdown menu, containing at least two values, one of which being “emergency”). Pressing
           “confirm” in the maintenance request creation form creates a new entry in the maintenance requests list with
           a “new” status.
    - Test case 3: Maintenance request edition form
        - (Not implemented as part of M4)
    - Test case 4: “Remove” button
        - (Not implemented as part of M4)
- **Maintenance requests page, building manager view:**
    - Test case 1: UI elements
        1) Setup: None
        2) Execution: Log in as a valid building manager, then navigate to the “Maintenance” page. Once the main
           “Maintenance Requests” page is validated, press the “Edit” button in an existing maintenance request.
        3) Validation: In the building manager view, all maintenance requests are listed with the same information as
           shown in the resident view, with the addition of the apartment number for each entry. All functions in all
           forms are identical in the building manager view, except: In the maintenance request edit form, there is an
           additional dropdown menu “status” that changes the status of the request being edited.

## Manual Back-End Tests

### M4 admin backend checks (M4 branch)

- **Admin-only route access**
    - Setup: Create one resident account and one admin account.
    - Execution: Send requests to the admin-only endpoints using both accounts.
    - Validation: The resident account is rejected with an authorization error, while the admin account is accepted.

- **Maintenance request status update**
    - Setup: Create or load a maintenance request record.
    - Execution: Send an admin update request changing the request status to a valid value.
    - Validation: The record is updated in MongoDB and the new status is returned by the API.

- **All forms and lists:**
    - Test Plan 1: Adding a record to the database:
        - Description:  When a request associated with a “create” function in a form is received, then all the received
          information is added to a new record in the pertinent database table. The new row must be complete and no
          information other than the received must be added.

        1) Setup:  No setup required.
        2) Execution:  Add a new record A to the database.
        3) Validation:  Assert that A is in the database.
    - Test Plan 2: Removing record from database:
        - Description: When a request associated with an “remove” function in a form is received, then the record and
          all references to it are deleted from the pertinent database table or tables.

        1) Setup:  Add record A to the database.
        2) Execution:  Remove record A from the database
        3) Validation:  Assert that A is not in the database.
    - Test Plan 3: Updating record from database:
        - Description: When a request associated with an “edit” function in a form is received, then all the received
          information is added to the correct existing record in the pertinent database table. The schema of the row or
          table must not change. No new rows must be created or deleted.

        1) Setup:  Add record A to the database.
        2) Execution:  Edit record A
        3) Validation:  Assert that edits to A are persisted in the database.
    - Test Plan 4: Retrieving 1 record from database:
        - Description: When a range of items in a list is requested, the returned list is complete, missing no fields or
          items, and has no items other than the requested.

        1) Setup:  Add records A, B, C, D to the database.
        2) Execution:  Call method requesting for record A.
        3) Validation:  Assert that record A is returned.
    - Test Plan 5: Retrieving no records from database:
        - Description: When a range of items in a list is requested, the returned list is complete, missing no fields or
          items, and has no items other than the requested.

        1) Setup:  No setup required.
        2) Execution:  Call method requesting for records A.
        3) Validation:  Assert that an empty list is returned.
    - Test Plan 6: Retrieving records from database:
        - Description: When a range of items in a list is requested, the returned list is complete, missing no fields or
          items, and has no items other than the requested.

        1) Setup:  Add records A, B, C, D to the database.
        2) Execution:  Call method requesting for records A, C
        3) Validation:  Assert that records A and C are returned in a list.
- **Login and authentication:**
    - Test plan 1: For every user, their password is stored encrypted.
        1) Setup:  No setup required
        2) Execution:  Add user account A and password a.
        3) Validation: Verify that A and encrypted(a) are stored in the database and not a.
    - Test plan 2: When a log in request is sent, the password is transmitted in an encrypted manner.
        1) Setup: No setup required.
        2) Execution: Call login() method with username A and password a as an argument.
        3) Validation:  Assert that login() sends encrypted(a), an encrypted version of a to the backend.
    - Test plan 3: If an invalid login is entered, the log in request is rejected.
        1) Setup: Create combinations of invalid inputs: (valid user, invalid password), (invalid user, valid
           password), (invalid user, valid password)
        2) Execution: Call the login() method with each combination as arguments.
        3) Validation:  Assert the login() method returns a “rejected” status
    - Test plan 4: Requests for personal or payment information are only accepted if the request comes from the
      authenticated user whose information is being requested.
        1) Setup:   Add valid account A and corresponding encrypted password a to the database.
        2) Execution:  Call getInformation() with A and a as arguments.
        3) Validation: Assert that getInformation returns an “accepted” status
- **Business logic consistency:**
    - Description: There are never any entries in the database table storing shared facility bookings that have the same
      facility, date and time.
    - There are several cases:
        - Case 1: Entries A and B have same facility,
        - Case 2: Entries A and B have same data
        - Case 3: Entries A and B have same time
        - Case 4: Entries A and B share the same values for more than 1 entry.
    - Test Plan 1: Add entry B with duplicate value in one or more of the fields: facility, date and time:
        1) Setup:  For each case, create two entries A and B. Add entry A to the database.
        2) Execution:  For each case, call addEntry() with B as an argument.
        3) Validation:  Assert for each case that A is in the database, and B is not.
    - Test Plan 2: Add entry B after removal of pre-existing entry A with duplicate value
        1) Setup:  Create entries A and B such that they share one or more duplicate values in one or more of the
           fields: facility, date, and time. Add entry A to the database.
        2) Execution:  Remove entry A. Then add entry B.
        3) Validation:  Assert that A is not in the database, and B is.

- **Admin Role-Based Management Logic:**
   - Test Plan 1: Maintenance Request Status Consistency
     - Description: When an Admin modifies the status of a maintenance ticket, the backend must enforce that the record state only mutates into predefined legal values ("New", "Contractor Requested", "Resolved").
     1) Setup: Create a maintenance ticket record initialized to status "New".
     2) Execution: Send an admin update request changing the status field to "Contractor Requested". Repeat execution attempting to assign an invalid custom status string like "In-Progress-Malformed".
     3) Validation: Assert that the valid state update resolves with an HTTP `200 OK` and persists in MongoDB. Assert that the malformed status mutation is caught by backend schema validation rules, returning an HTTP `400 Bad Request`.
  - Test Plan 2: Cascading Deletions on Facility Removal
     - Description: When an administrator deletes a shared facility device from the active fleet, all pending or future resident bookings coupled to that device's unique ID must be gracefully purged to avoid orphaned references in the database.
     1) Setup: Insert a facility item "Laundry Machine Alpha". Inject 3 active future reservation documents into the bookings collection linked to this facility ID.
     2) Execution: Authenticate as an Admin and trigger the deletion endpoint for "Laundry Machine Alpha".
     3) Validation: Query the database collections. Assert that the facility document is expunged from the facilities collection, AND assert that an empty array is returned when querying the bookings collection for that removed facility ID.

## Manual IoT Tests

### M4 Manual IoT Tests

**Background**

To run IoT tests start app with `docker compose up --build` in the root folder.

IoT requires the use of the `mqtt-test-app`.
This a separate app that is meant to simulate the functionality of an IoT device sending our app updates.
To run this app:

1. Install NodeJS and NPM
2. Navigate to the `mqtt-test-app` folder.
3. Run `npm install`
4. Follow the instructions in `mqtt-test-app.md`. Example command for running a series of messages in the `data/data.json` file: `node mqtt-test-app.js -f`.

If the following instructions above fail, try running `docker compose up --build` in the `mqtt-test-app` folder.
This will read from the `data.json` file and execute the test app as if it is manually running the command `node mqtt-test-app.js -f`.

- **Machine Status Update Capabilities Tests**
  - Test that machines can be set to be in use. (Test 1)
    1. Confirm the app is running.
    2. Open the facilities page as a resident user.
    3. Navigate to "Washing Machine 1" and modal by clicking on it.
    4. Confirm that the status value is set to "Available"
    5. Copy the contents of `mqtt-test-app/data/testData/test1data.json` into `mqtt-test-app/data/data.json`.
    6. Run the MQTT test app using the instructions above.
    7. Close and then reopen the "Washing Machine 1" modal. 
    8. Confirm that the status value is set to "In use"

  - Test that machines can be set to no longer be in use. (Test 2)
    1. Confirm the app is running.
    2. Open the facilities page as a resident user.
    3. Navigate to "Washing Machine 1" and modal by clicking on it.
    4. Confirm that the status value is set to "In use"
    5. Copy the contents of `mqtt-test-app/data/testData/test2data.json` into `mqtt-test-app/data/data.json`.
    6. Run the MQTT test app using the instructions above.
    7. Close and then reopen the "Washing Machine 1" modal.
    8. Confirm that the status value is set to "Available"

  - Test that machines can be set to be out of service. (Test 3)
    1. Confirm the app is running.
    2. Open the facilities page as a resident user.
    3. Navigate to "Washing Machine 1" and modal by clicking on it.
    4. Confirm that the status value is "Available"
    5. Copy the contents of `mqtt-test-app/data/testData/test3data.json` into `mqtt-test-app/data/data.json`.
    6. Run the MQTT test app using the instructions above.
    7. Close and then reopen the "Washing Machine 1" modal.
    8. Confirm that the status value is set to "Out of service"

  - Test that machines can be set to be no longer out of service. (Test 4)
    1. Confirm the app is running.
    2. Open the facilities page as a resident user.
    3. Navigate to "Washing Machine 1" and modal by clicking on it.
    4. Confirm that the status value is set to "Out of service"
    5. Copy the contents of `mqtt-test-app/data/testData/test4data.json` into `mqtt-test-app/data/data.json`.
    6. Run the MQTT test app using the instructions above.
    7. Close and then reopen the "Washing Machine 1" modal.
    8. Confirm that the status value is set to "Available"


## Bugs

Bugs that have been found before the M4 submission date have been recorded as github issues.
Please view them for instructions on how to reproduce them.

## Automated Tests

Automated tests have not yet been updated to the Milestone 4 features. They should not currently be used for testing.