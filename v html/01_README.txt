PETCARE CLINIC MANAGEMENT SYSTEM 

FILES
- index.html: Dashboard and summary numbers.
- owners.html: Register, search and delete pet owners.
- pets.html: Register and delete pets; connect each pet to an owner.
- appointments.html: Book, update and cancel appointments.
- billing.html: Create bills and print receipts.
- reports.html: Show totals, paid revenue, appointments and bills.
- style.css: Controls colours, spacing, layout and mobile display.
- script.js: Handles forms, records, browser storage and reports.

HOW TO RUN
1. Open index.html in a web browser.
2. Use the left menu to open the other pages.
3. Register an owner before registering that owner's pet.
4. Register a pet before booking an appointment or creating a bill.

IMPORTANT
- The project stores data in the browser's localStorage. It does not use an online database.
- Data stays in the same browser unless its site data is cleared.
- The website uses the same localStorage names as the original project:
  owners, pets, appointments and bills.
- Existing records in the same browser should therefore remain available.
- The billing table was corrected so its headings match the information shown by JavaScript.
- The dashboard's recent appointments are now loaded from saved appointment records.