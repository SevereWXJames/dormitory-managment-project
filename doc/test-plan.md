# Milestone 2 Test Plan

## Purpose

This test plan supports the Milestone 2 submission for SmartAPT. It describes how to verify Docker deployment, frontend availability, backend startup, and the current state of application functionality.

## Setup

1. Ensure Docker Desktop is installed and running.
2. Clone this repository from GitHub.
3. Place `.env` file from Canvas into the main folder of the project.

## Manual Tests

### Deployment and smoke tests

#### 1. Docker deployment

Steps:

1. Start the containers:

```bash
docker compose up --build
```

2. Verify the Docker Compose start process finishes without errors.
3. Confirm the following containers are running:
   - frontend
   - backend
   - mongo

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
      3) Validation: Changing any value and pressing “confirm” exits the form and adds or - changes the pertinent information correctly.
- **Login page:**
   - Test case 1: UI Elements
      1) Setup: None
      2) Execution: Open the login page.
      3) Validation: There are three text input fields present (Username, E-mail and Password) and one button input (Log in)
   - Test case 2: Login function
      1) Setup: Open the login page.
      2) Execution: Enter a valid e-mail and password combination (for M2, any e-mail and password combination is valid) in their respective fields, then press the “Log in” button.
      3) Validation: Logging in as a valid resident/building manager user opens the resident/building manager dashboard page.
- **Personal information form:**
   - (Not implemented as of M2)
- **Payment information form:**
   - (Removed from specification)
- **Shared facilities page, resident view:**
   - Test case 1: UI elements
      1) Setup: None
      2) Execution: Log in as a valid resident, then navigate to the “Facilities” page.
      3) Validation:
         - There is a list of named items corresponding to each shared facility with an indication of current availability, and a button to book a time slot.
         - The “reserve” button is disabled if the shared facility is unavailable.
   - Test case 2: “Reserve” button
      1) Setup: Log in as a valid resident, then navigate to the “Facilities” page.
      2) Execution: Press the “Reserve” button for an available facility.
      3) Validation: Pressing the “book a time slot” button opens a form with the fields “date” and “time”. Pressing “confirm” books a time slot for the chosen facility and the current user.
   - Test case 3: Booked facility availability.
      1) Setup: Ensure there is at least one booked facility.
      2) Execution: Log in as a valid resident, then navigate to the “Facilities” page. Then, wait until the current booking for that facility ends.
      3) Validation: Booked facilities should automatically be displayed as unavailable during their booked time, and then displayed as available once that time lapses.
- **Shared facilities page, building manager view:**
   - Test case 1: UI elements
      1) Setup: None
      2) Execution: Log in as a valid building manager, then navigate to the “Facilities” page.
      3) Validation: There is a list of named items corresponding to each shared facility with an indication of current availability, and buttons to add, edit and remove facilities. Each item has a checkbox to select it.
   - Test case 2: “Add Device” form
      1) Setup: Log in as a valid building manager, then navigate to the “Facilities” page.
      2) Execution: Press the “Add Device” button
      3) Validation: The add button opens a form with the fields “name” (text input) and “type” (dropdown menu). Pressing “confirm changes” adds a new item to the list.
   - Test case 3: “Edit Device”
      1) Setup: Log in as a valid building manager, then navigate to the “Facilities” page.
      2) Execution: Press the “Edit” button in a listed device.
      3) Validation: The edit button opens a form with the fields “name” (text input) and “type” (dropdown menu) and an “available” checkbox. Pressing “confirm changes” with the “available” checkbox ticked lists the item as available, and without the checkbox ticked the item is listed as unavailable but is still present in the list. Pressing the “Remove” button removes the device from the list.
- **Credits page, resident view:**
   - Test case 1: UI elements
      1) Setup: None.
      2) Execution: Log in as a valid resident, then navigate to the “Credits” page.
      3) Validation: The payment portal lists all previous payments made for building facilities, with their date and amount.
   - Test case 2: Add Credits form
      1) Setup: None.
      2) Execution: Log in as a valid resident, then navigate to the “Credits” page.
      3) Validation: In the Add Credits form, there are the following editable fields: “Card Number” (numerical), “Expiration Date” (date in MM/YY format), “Security code” (numerical), “Cardholder name” (text), “Amount” (numerical); and a “Pay” button that attempts to make a payment.
   - Test case 3: Accepted payment
      1) Setup: Log in as a valid resident, then navigate to the “Credits” page.
      2) Execution: Press “Pay”, fill in all mandatory fields with valid values, choose a valid card as the payment method, then press “Pay”.
      3) Validation: If the payment is accepted, then a new entry in the Payment History section appears with the provided card number, the current date and the provided amount.
   - Test case 4: Rejected payment
      - (Payment verification not implemented as of M2)
- **Maintenance requests page, resident view:**
   - Test case 1: UI elements
      1) Setup: None
      2) Execution: Log in as a valid resident, then navigate to the “Maintenance” page.
      3) The resident’s previous maintenance requests are listed, with a description, date and status (one of “New”, “Contractor Requested” and “Resolved”) for each item on the list. There is a “Create Request” button that opens the maintenance request creation form, and “Edit” and “Remove” buttons.
   - Test case 2: Maintenance request creation form
      1) Setup: Log in as a valid resident, then navigate to the “Maintenance” page.
      2) Execution: Press the “Create Request” button.
      3) Validation: The maintenance request creation form has the input fields “category” (dropdown menu, indicating the general type of issue e.g. “plumbing”, “HVAC”, etc.), “location” (text input), “description (text input), and priority (dropdown menu, containing at least two values, one of which being “emergency”). Pressing “confirm” in the maintenance request creation form creates a new entry in the maintenance requests list with a “new” status.
   - Test case 3: Maintenance request edition form
      - (Not implemented as part of M2)
   - Test case 4: “Remove” button
      - (Not implemented as part of M2)
- **Maintenance requests page, building manager view:**
   - Test case 1: UI elements
      1) Setup: None
      2) Execution: Log in as a valid building manager, then navigate to the “Maintenance” page. Once the main “Maintenance Requests” page is validated, press the “Edit” button in an existing maintenance request.
      3) Validation: In the building manager view, all maintenance requests are listed with the same information as shown in the resident view, with the addition of the apartment number for each entry. All functions in all forms are identical in the building manager view, except: In the maintenance request edit form, there is an additional dropdown menu “status” that changes the status of the request being edited.
- **Notices page, resident view:**
   - Test case 1: UI elements
      1) Setup: None
      2) Execution: Log in as a valid resident, then navigate to the “Notices” page.
      3) Validation: In the resident view, there is a list of all notices the user can view. Notices not yet opened by the user are under the “Unread Messages” section.
- **Notices page, building manager view:**
   - Test case 1: UI elements
      1) Setup: None
      2) Execution: Log in as a valid building manager, then navigate to the “Notices” page.
      3) Validation: In the building manager view, there is a list of all notices, with a checkbox for each item to select it, a “Create Notice” button, and “Edit” and “Remove” buttons for each notice.
   - Test case 2: Notice creation form
      1) Setup: Log in as a valid building manager, then navigate to the “Notices” page.
      2) Execution: Press the “Create Notice” button.
      3) Validation: Pressing the “create” button opens the notice creation form with the fields “title” (text input) and “body” (multi-line text input), and “confirm” and “cancel” buttons. Pressing “confirm” publishes the notice so that it is visible for all residents.
   - Test case 3: Notice edition form
      1) Setup: Log in as a valid building manager, then navigate to the “Notices” page. Ensure there is at least one notice present.
      2) Execution: Press the “Edit” button in one of the present notices.
      3) Validation: Pressing the “edit” button opens a form identical to the notice creation form, with the fields filled in with existing values for that notice. Pressing “confirm” in this form edits the information associated to that notice and enables the “not read” indications for all residents.
   - Test case 4: “Remove” button
      1) Setup: Log in as a valid building manager, then navigate to the “Notices” page. Ensure there is at least one notice present.
      2) Execution: Press the “Remove” button in one of the present notices.
      3) Validation: The “remove” button erases the notice.
- **Residents page, administrator view:**
   - Test case 1: Access to the Residents page
      1) Setup: None
      2) Execution: Log in as a resident, try navigating to the “Residents” page. Log out and try the same procedure logging in as a building manager.
      3) Validation: It is only possible to view the Residents page when logged in as a building manager.
   - Test case 2: UI elements:
      1) Setup: None
      2) Execution: Log in as a building manager and navigate to the “Residents” page.
      3) Validation: A list of apartments and their residents is shown.

## Manual Back-End Tests

- **All forms and lists:**
   - Test Plan 1: Adding a record to the database:
      - Description:  When a request associated with a “create” function in a form is received, then all the received information is added to a new record in the pertinent database table. The new row must be complete and no information other than the received must be added.
      1) Setup:  No setup required. 
      2) Execution:  Add a new record A to the database. 
      3) Validation:  Assert that A is in the database. 
   - Test Plan 2: Removing record from database: 
      - Description: When a request associated with an “remove” function in a form is received, then the record and all references to it are deleted from the pertinent database table or tables.
      1) Setup:  Add record A to the database. 
      2) Execution:  Remove record A from the database
      3) Validation:  Assert that A is not in the database. 
   - Test Plan 3: Updating record from database:
      - Description: When a request associated with an “edit” function in a form is received, then all the received information is added to the correct existing record in the pertinent database table. The schema of the row or table must not change. No new rows must be created or deleted.
      1) Setup:  Add record A to the database. 
      2) Execution:  Edit record A
      3) Validation:  Assert that edits to A are persisted in the database. 
   - Test Plan 4: Retrieving 1 record from database: 
      - Description: When a range of items in a list is requested, the returned list is complete, missing no fields or items, and has no items other than the requested.
      1) Setup:  Add records A, B, C, D to the database. 
      2) Execution:  Call method requesting for record A.
      3) Validation:  Assert that record A is returned. 
   - Test Plan 5: Retrieving no records from database: 
      - Description: When a range of items in a list is requested, the returned list is complete, missing no fields or items, and has no items other than the requested.
      1) Setup:  No setup required.
      2) Execution:  Call method requesting for records A.
      3) Validation:  Assert that an empty list is returned. 
   - Test Plan 6: Retrieving records from database: 
      - Description: When a range of items in a list is requested, the returned list is complete, missing no fields or items, and has no items other than the requested.
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
      1) Setup: Create combinations of invalid inputs: (valid user, invalid password), (invalid user, valid password), (invalid user, valid password)
      2) Execution: Call the login() method with each combination as arguments. 
      3) Validation:  Assert the login() method returns a “rejected” status
   - Test plan 4: Requests for personal or payment information are only accepted if the request comes from the authenticated user whose information is being requested.
      1) Setup:   Add valid account A and corresponding encrypted password a to the database.
      2) Execution:  Call getInformation() with A and a as arguments.
      3) Validation: Assert that getInformation returns an “accepted” status
- **Business logic consistency:**
   - Description: There are never any entries in the database table storing shared facility bookings that have the same facility, date and time. 
   - There are several cases: 
      - Case 1: Entries A and B have same facility,
      - Case 2: Entries A and B have same data 
      - Case 3: Entries A and B have same time 
      - Case 4: Entries A and B share the same values for more than 1 entry.
   - Test Plan 1: Add entry B with duplicate value in one or more of the fields: facility, date and time: 
      1) Setup:  For each case, create two entries A and B. Add entry A to the database.
      2) Execution:  For each case, call addEntry() with  B as an argument.
      3) Validation:  Assert for each case that A is in the database, and B is not.
   - Test Plan 2: Add entry B after removal of pre-existing entry A with duplicate value 
      1) Setup:  Create entries A and B such that they share one or more duplicate values in one or more of the fields: facility, date, and time. Add entry A to the database. 
      2) Execution:  Remove entry A. Then add entry B.
      3) Validation:  Assert that A is not in the database, and B is.


## Bugs

No bugs have been reported as of the M2 submission date.

## Automated Tests

At present, there are no automated unit or integration tests configured in this branch. The following commands can be used if tests are added later:

```bash
cd frontend
npm test
```
