# PetCare Clinic 

## 1. What does this project do?
This is a small Veterinary Clinic Management System. A receptionist can:
1. Register pet owners.
2. Register pets and connect each pet to its owner.
3. Book appointments for registered pets.
4. Change an appointment status or cancel it.
5. Create bills and print receipts.
6. View dashboard totals and clinic reports.

## 2. How do the files work together?
- `index.html`, `owners.html`, `pets.html`, `appointments.html`, `billing.html`, and `reports.html` create the six pages.
- Each HTML page links to `style.css`, which controls the appearance.
- Each page (including the dashboard) loads `script.js`, which makes the forms and tables work.
- The browser's `localStorage` saves the records. There is no server or online database in this project.

## 3. HTML concepts to explain
- `<!DOCTYPE html>` tells the browser to use modern HTML.
- `<html>` contains the complete web page.
- `<head>` contains page information, the title and CSS link.
- `<body>` contains the visible page content.
- `<aside>` is used for the side navigation menu.
- `<nav>` groups the page links.
- `<main>` contains the main page content.
- `<section>` groups related content, such as a form or table.
- `<form>` collects information from the receptionist.
- `<label>` tells the user what an input is for.
- `<input>` accepts short information such as a name, date or number.
- `<select>` creates a dropdown list.
- `<textarea>` accepts longer text, such as an address or visit reason.
- `required` makes a field compulsory.
- `readonly` shows a value but does not allow the user to edit it.
- `id` gives an HTML element a unique name so JavaScript can find it.
- `<table>`, `<tr>`, `<th>` and `<td>` create a data table.
- `<script src="script.js">` connects the JavaScript file to the page.

## 4. CSS concepts to explain
- A CSS rule selects an HTML element and gives it styles.
- `*` selects all elements.
- `margin` creates space outside an element.
- `padding` creates space inside an element.
- `background-color` changes the background.
- `color` changes text colour.
- `font-family` selects the text style.
- `border` adds an outline.
- `border-radius` makes corners rounded.
- `display: grid` arranges cards in columns.
- `display: flex` arranges items in a row or column.
- `position: fixed` keeps the sidebar in place on a wide screen.
- `@media` applies different styles for smaller screens.
- `overflow-x: auto` lets a wide table scroll horizontally on a small screen.

## 5. JavaScript concepts to explain

### A. Reading and saving data
- `localStorage.getItem(key)` reads saved text from the browser.
- `JSON.parse()` changes JSON text into a JavaScript value, such as an array.
- `localStorage.setItem(key, value)` saves text in the browser.
- `JSON.stringify()` changes an array or object into JSON text.
- `getSavedData()` is a small reusable function that reads saved records.
- `saveData()` is a small reusable function that saves records.

**Why use JSON?** localStorage stores text. JSON lets the program save arrays and objects as text and read them back later.

### B. Variables and objects
- `let` creates a variable whose value can change.
- An object stores related information using property names.
- Example: an owner object stores `id`, `name`, `phone`, `email` and `address`.
- An array stores a list of objects, such as all registered owners.

### C. Events
- `addEventListener("submit", ...)` runs code when a form is submitted.
- `event.preventDefault()` stops the browser from refreshing the page after form submission.
- `addEventListener("change", ...)` runs code when a dropdown selection changes.
- `addEventListener("input", ...)` runs code when the user types in the search box.
- `onclick` runs a function when a button is clicked.
- `onchange` runs a function when an appointment status dropdown changes.

### D. Array methods
- `push()` adds a new record to the end of an array.
- `splice()` removes a record from an array.
- `forEach()` runs the same code for every item in an array.
- `find()` searches for the first matching item.
- `findIndex()` finds the position of a matching item.
- `filter()` creates a new array containing only matching items.
- `slice()` copies part of an array without changing the original array.
- `reverse()` reverses the order of items.

### E. Other JavaScript features
- `document.getElementById()` finds an HTML element using its id.
- `.value` reads or changes an input's value.
- `.innerHTML` changes the HTML inside an element.
- `.innerText` changes the visible text inside an element.
- `Date.now()` creates a number based on the current time. It is used as a simple record ID.
- `Number()` converts a value to a number before adding bill charges.
- `if` checks a condition.
- `return` sends a result back from a function or stops a function.
- `confirm()` asks the user to confirm an action.
- `alert()` displays a message.
- `window.open()` opens a new browser window for printing a receipt.
- `window.print()` opens the browser's print dialog.
- `${...}` inserts a variable's value into a template string.

## 6. Explain each JavaScript section

### Section 1 — Pet Owner Management
The program reads the saved owners. When the owner form is submitted, it reads the fields, creates an owner object, adds it to the owners array and saves the array. `displayOwners()` shows the owners in a table. `deleteOwner()` removes an owner after confirmation. The search box uses `filter()` to show owners whose name or phone matches the typed text.

### Section 2 — Pet Management
`loadOwners()` puts registered owners into the pet form's owner dropdown. When the pet form is submitted, the program finds the selected owner and creates a pet object. The pet record stores the owner's ID and name. `displayPets()` shows all pets. `deletePet()` removes a selected pet.

### Section 3 — Appointment Management
`loadPets()` fills the appointment dropdown with registered pets. When a pet is selected, the matching owner's name is filled automatically. Submitting the form creates an appointment with a default status of `Pending`. `updateAppointmentStatus()` changes its status. `cancelAppointment()` removes it after confirmation.

### Section 4 — Billing Management
`loadBillingPets()` fills the billing dropdown. Selecting a pet fills the owner name. The billing form reads consultation, medicine and other charges. `Number()` converts the input values to numbers. The total is calculated by adding the three charges. `displayBills()` shows all bills. `printBill()` finds the selected bill, opens a new window, writes a receipt and starts printing.

### Section 5 — Dashboard
`updateDashboard()` reads the saved arrays and displays the number of owners, pets and appointments. It uses `filter()` to count only bills with `Pending` status. It also displays the five most recently added appointments.

### Section 6 — Reports
`displayReports()` displays the total number of owners, pets, appointments and bills. It adds only bills with `Paid` status to total revenue. It then fills the appointment report and billing report tables.

## 7. Common viva questions and short answers

**Q1. What is the purpose of this project?**  
It helps a veterinary clinic manage owners, pets, appointments, bills and reports from one website.

**Q2. Which languages are used?**  
HTML is used for page structure, CSS for design, and JavaScript for functionality.

**Q3. What is localStorage?**  
It is browser storage that saves data as text and keeps it after the page is refreshed or closed.

**Q4. Is this project connected to a database?**  
No. This version uses the browser's localStorage. It does not use a server or online database.

**Q5. Why do we use JSON.stringify and JSON.parse?**  
`JSON.stringify()` converts data into text for saving. `JSON.parse()` converts the saved text back into JavaScript data.

**Q6. Why is preventDefault used?**  
It stops the form from refreshing the page when it is submitted.

**Q7. How is a pet connected to an owner?**  
The pet form uses the selected owner's ID and saves the owner's name with the pet record.

**Q8. How is the bill total calculated?**  
Consultation fee + medicine charges + other charges.

**Q9. How is total revenue calculated?**  
The program adds the total amount of bills whose status is `Paid`. Pending bills are not included.

**Q10. What does filter() do in this project?**  
It selects matching records, such as owners matching a search or bills with Pending status.

**Q11. What happens when an appointment is booked?**  
The program creates an appointment object, sets its status to Pending, adds it to the appointments array and saves it.

**Q12. What is the purpose of CSS media queries?**  
They change the layout for smaller screens so the website can be used on phones and tablets.

**Q13. Why is Date.now() used?**  
It provides a simple number to use as a record ID based on the current time. It is not a formal database ID system.

**Q14. What is the difference between == and ===?**  
`==` compares values after possible type conversion. `===` compares both value and data type. In this project, `==` is used when comparing dropdown values with stored IDs because dropdown values are read as text.

## 8. Important points to remember 
- Explain the flow in this order: owner → pet → appointment or bill → reports.
- A pet must be registered before it can be selected for an appointment or bill.
- An owner must be registered before their pet can be registered.
- Appointment status starts as Pending and can be changed to Confirmed or Completed.
- Only Paid bills are counted as revenue.
- Data is saved in the browser, not on an online server.
- Keep all project files together in one folder because the HTML pages link to `style.css` and `script.js`.
