// ==================================================
// PETCARE CLINIC MANAGEMENT SYSTEM
// This file controls forms, tables and saved records.
// ==================================================

// Read saved information from the browser.
function getSavedData(key) {
    let data = localStorage.getItem(key);

    if (data === null) {
        return [];
    }

    return JSON.parse(data);
}

// Save information in the browser.
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// ==================================================
// 1. PET OWNER MANAGEMENT
// ==================================================

let owners = getSavedData("owners");
let ownerForm = document.getElementById("ownerForm");

function displayOwners(listToShow) {
    let ownerList = document.getElementById("ownerList");

    if (!ownerList) return;

    ownerList.innerHTML = "";

    // Show every owner in the list.
    listToShow.forEach(function(owner) {
        let ownerIndex = owners.findIndex(function(item) {
            return item.id === owner.id;
        });

        ownerList.innerHTML += `
            <tr>
                <td>${owner.id}</td>
                <td>${owner.name}</td>
                <td>${owner.phone}</td>
                <td>${owner.email}</td>
                <td><button onclick="deleteOwner(${ownerIndex})">Delete</button></td>
            </tr>
        `;
    });
}

if (ownerForm) {
    ownerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let newOwner = {
            id: Date.now(),
            name: document.getElementById("ownerName").value,
            phone: document.getElementById("phone").value,
            email: document.getElementById("email").value,
            address: document.getElementById("address").value
        };

        owners.push(newOwner);
        saveData("owners", owners);

        alert("Owner registered successfully!");
        ownerForm.reset();
        displayOwners(owners);
    });
}

// Delete one owner using its position in the array.
function deleteOwner(index) {
    if (confirm("Are you sure you want to delete this owner?")) {
        owners.splice(index, 1);
        saveData("owners", owners);
        displayOwners(owners);
    }
}

// Search owners by name or phone number.
let searchOwner = document.getElementById("searchOwner");

if (searchOwner) {
    searchOwner.addEventListener("input", function() {
        let searchText = searchOwner.value.toLowerCase();

        let matchingOwners = owners.filter(function(owner) {
            return owner.name.toLowerCase().includes(searchText) ||
                   owner.phone.includes(searchText);
        });

        displayOwners(matchingOwners);
    });
}

displayOwners(owners);

// ==================================================
// 2. PET MANAGEMENT
// ==================================================

let pets = getSavedData("pets");
let petForm = document.getElementById("petForm");

function loadOwners() {
    let ownerDropdown = document.getElementById("petOwner");

    if (!ownerDropdown) return;

    ownerDropdown.innerHTML = '<option value="">Select Owner</option>';

    // Add saved owners to the dropdown.
    owners = getSavedData("owners");

    owners.forEach(function(owner) {
        ownerDropdown.innerHTML += `
            <option value="${owner.id}">${owner.name}</option>
        `;
    });
}

function displayPets() {
    let petList = document.getElementById("petList");

    if (!petList) return;

    petList.innerHTML = "";

    pets.forEach(function(pet, index) {
        petList.innerHTML += `
            <tr>
                <td>${pet.id}</td>
                <td>${pet.name}</td>
                <td>${pet.type}</td>
                <td>${pet.breed}</td>
                <td>${pet.age}</td>
                <td>${pet.gender}</td>
                <td>${pet.ownerName}</td>
                <td><button onclick="deletePet(${index})">Delete</button></td>
            </tr>
        `;
    });
}

if (petForm) {
    loadOwners();

    petForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let ownerId = document.getElementById("petOwner").value;

        // Find the owner selected in the dropdown.
        let selectedOwner = owners.find(function(owner) {
            return owner.id == ownerId;
        });

        if (!selectedOwner) {
            alert("Please select a valid owner.");
            return;
        }

        let newPet = {
            id: Date.now(),
            name: document.getElementById("petName").value,
            type: document.getElementById("petType").value,
            breed: document.getElementById("breed").value,
            age: document.getElementById("age").value,
            gender: document.getElementById("gender").value,
            ownerId: ownerId,
            ownerName: selectedOwner.name
        };

        pets.push(newPet);
        saveData("pets", pets);

        alert("Pet registered successfully!");
        petForm.reset();
        displayPets();
        loadOwners();
    });
}

function deletePet(index) {
    if (confirm("Are you sure you want to delete this pet?")) {
        pets.splice(index, 1);
        saveData("pets", pets);
        displayPets();
    }
}

displayPets();

// ==================================================
// 3. APPOINTMENT MANAGEMENT
// ==================================================

let appointments = getSavedData("appointments");
let appointmentForm = document.getElementById("appointmentForm");

function loadPets() {
    let petDropdown = document.getElementById("appointmentPet");

    if (!petDropdown) return;

    petDropdown.innerHTML = '<option value="">Select Pet</option>';
    pets = getSavedData("pets");

    pets.forEach(function(pet) {
        petDropdown.innerHTML += `
            <option value="${pet.id}">${pet.name}</option>
        `;
    });
}

function displayAppointments() {
    let appointmentList = document.getElementById("appointmentList");

    if (!appointmentList) return;

    appointmentList.innerHTML = "";

    appointments.forEach(function(appointment, index) {
        appointmentList.innerHTML += `
            <tr>
                <td>${appointment.id}</td>
                <td>${appointment.petName}</td>
                <td>${appointment.ownerName}</td>
                <td>${appointment.doctor}</td>
                <td>${appointment.date}</td>
                <td>${appointment.time}</td>
                <td>${appointment.reason}</td>
                <td>
                    <select onchange="updateAppointmentStatus(${index}, this.value)">
                        <option value="Pending" ${appointment.status === "Pending" ? "selected" : ""}>Pending</option>
                        <option value="Confirmed" ${appointment.status === "Confirmed" ? "selected" : ""}>Confirmed</option>
                        <option value="Completed" ${appointment.status === "Completed" ? "selected" : ""}>Completed</option>
                    </select>
                </td>
                <td><button onclick="cancelAppointment(${index})">Cancel</button></td>
            </tr>
        `;
    });
}

if (appointmentForm) {
    loadPets();

    let petDropdown = document.getElementById("appointmentPet");

    // Fill the owner name when a pet is selected.
    petDropdown.addEventListener("change", function() {
        let selectedPet = pets.find(function(pet) {
            return pet.id == petDropdown.value;
        });

        document.getElementById("appointmentOwner").value =
            selectedPet ? selectedPet.ownerName : "";
    });

    appointmentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let petId = petDropdown.value;

        let selectedPet = pets.find(function(pet) {
            return pet.id == petId;
        });

        if (!selectedPet) {
            alert("Please select a valid pet.");
            return;
        }

        let newAppointment = {
            id: Date.now(),
            petName: selectedPet.name,
            ownerName: selectedPet.ownerName,
            doctor: document.getElementById("doctor").value,
            date: document.getElementById("appointmentDate").value,
            time: document.getElementById("appointmentTime").value,
            reason: document.getElementById("reason").value,
            status: "Pending"
        };

        appointments.push(newAppointment);
        saveData("appointments", appointments);

        alert("Appointment booked successfully!");
        appointmentForm.reset();
        document.getElementById("appointmentOwner").value = "";

        displayAppointments();
        loadPets();
    });
}

// Change an appointment's status.
function updateAppointmentStatus(index, newStatus) {
    appointments[index].status = newStatus;
    saveData("appointments", appointments);
    displayAppointments();

    alert("Appointment status updated!");
}

// Cancel and remove an appointment.
function cancelAppointment(index) {
    if (confirm("Are you sure you want to cancel this appointment?")) {
        appointments.splice(index, 1);
        saveData("appointments", appointments);
        displayAppointments();
    }
}

displayAppointments();

// ==================================================
// 4. BILLING MANAGEMENT
// ==================================================

let bills = getSavedData("bills");
let billingForm = document.getElementById("billingForm");

function loadBillingPets() {
    let petDropdown = document.getElementById("billPet");

    if (!petDropdown) return;

    petDropdown.innerHTML = '<option value="">Select Pet</option>';
    pets = getSavedData("pets");

    pets.forEach(function(pet) {
        petDropdown.innerHTML += `
            <option value="${pet.id}">${pet.name}</option>
        `;
    });
}

function displayBills() {
    let billList = document.getElementById("billList");

    if (!billList) return;

    billList.innerHTML = "";

    bills.forEach(function(bill) {
        billList.innerHTML += `
            <tr>
                <td>${bill.id}</td>
                <td>${bill.petName}</td>
                <td>${bill.ownerName}</td>
                <td>₹${bill.consultation}</td>
                <td>₹${bill.medicine}</td>
                <td>₹${bill.other}</td>
                <td>₹${bill.total}</td>
                <td>${bill.status}</td>
                <td><button onclick="printBill(${bill.id})">Print</button></td>
            </tr>
        `;
    });
}

if (billingForm) {
    loadBillingPets();

    let petDropdown = document.getElementById("billPet");

    // Fill the owner name when a pet is selected.
    petDropdown.addEventListener("change", function() {
        let selectedPet = pets.find(function(pet) {
            return pet.id == petDropdown.value;
        });

        document.getElementById("billOwner").value =
            selectedPet ? selectedPet.ownerName : "";
    });

    billingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let selectedPet = pets.find(function(pet) {
            return pet.id == petDropdown.value;
        });

        if (!selectedPet) {
            alert("Please select a valid pet.");
            return;
        }

        let consultation = Number(document.getElementById("consultationFee").value) || 0;
        let medicine = Number(document.getElementById("medicineFee").value) || 0;
        let other = Number(document.getElementById("otherFee").value) || 0;

        let newBill = {
            id: Date.now(),
            petName: selectedPet.name,
            ownerName: selectedPet.ownerName,
            consultation: consultation,
            medicine: medicine,
            other: other,
            total: consultation + medicine + other,
            status: document.getElementById("paymentStatus").value
        };

        bills.push(newBill);
        saveData("bills", bills);

        alert("Bill generated successfully!");
        billingForm.reset();
        document.getElementById("billOwner").value = "";

        displayBills();
        loadBillingPets();
    });
}

// Create a printable receipt for one bill.
function printBill(id) {
    let bill = bills.find(function(item) {
        return item.id === id;
    });

    if (!bill) return;

    let printWindow = window.open("", "", "width=600,height=600");

    if (!printWindow) {
        alert("Please allow pop-ups to print the bill.");
        return;
    }

    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>PetCare Clinic Bill</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 30px;
                }
                h2 {
                    text-align: center;
                    color: green;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
                td {
                    border: 1px solid #ccc;
                    padding: 10px;
                }
            </style>
        </head>
        <body>
            <h2>PetCare Clinic</h2>
            <h3>Payment Receipt</h3>
            <p><b>Bill ID:</b> ${bill.id}</p>
            <p><b>Pet Name:</b> ${bill.petName}</p>
            <p><b>Owner Name:</b> ${bill.ownerName}</p>

            <table>
                <tr><td>Consultation Fee</td><td>₹${bill.consultation}</td></tr>
                <tr><td>Medicine Fee</td><td>₹${bill.medicine}</td></tr>
                <tr><td>Other Charges</td><td>₹${bill.other}</td></tr>
                <tr><td><b>Total Amount</b></td><td><b>₹${bill.total}</b></td></tr>
                <tr><td>Payment Status</td><td>${bill.status}</td></tr>
            </table>

            <p style="text-align:center; margin-top:30px;">
                Thank you for visiting PetCare Clinic!
            </p>

            <script>
                window.onload = function() {
                    window.print();
                };
            <\/script>
        </body>
        </html>
    `);

    printWindow.document.close();
}

displayBills();

// ==================================================
// 5. DASHBOARD
// ==================================================

function updateDashboard() {
    let savedOwners = getSavedData("owners");
    let savedPets = getSavedData("pets");
    let savedAppointments = getSavedData("appointments");
    let savedBills = getSavedData("bills");

    let ownersNumber = document.getElementById("totalOwners");
    let petsNumber = document.getElementById("totalPets");
    let appointmentsNumber = document.getElementById("totalAppointments");
    let pendingBillsNumber = document.getElementById("pendingBills");

    if (ownersNumber) ownersNumber.innerText = savedOwners.length;
    if (petsNumber) petsNumber.innerText = savedPets.length;
    if (appointmentsNumber) appointmentsNumber.innerText = savedAppointments.length;

    if (pendingBillsNumber) {
        let pendingCount = savedBills.filter(function(bill) {
            return bill.status === "Pending";
        }).length;

        pendingBillsNumber.innerText = pendingCount;
    }

    // Show recent appointments on the dashboard.
    let dashboardList = document.getElementById("dashboardAppointments");

    if (dashboardList) {
        dashboardList.innerHTML = "";

        savedAppointments.slice(-5).reverse().forEach(function(appointment) {
            dashboardList.innerHTML += `
                <tr>
                    <td>${appointment.petName}</td>
                    <td>${appointment.ownerName}</td>
                    <td>${appointment.doctor}</td>
                    <td>${appointment.date}</td>
                    <td>${appointment.status}</td>
                </tr>
            `;
        });
    }
}

updateDashboard();

// ==================================================
// 6. REPORTS
// ==================================================

function displayReports() {
    let savedOwners = getSavedData("owners");
    let savedPets = getSavedData("pets");
    let savedAppointments = getSavedData("appointments");
    let savedBills = getSavedData("bills");

    let ownersNumber = document.getElementById("totalOwners");
    let petsNumber = document.getElementById("totalPets");
    let appointmentsNumber = document.getElementById("totalAppointments");
    let billsNumber = document.getElementById("totalBills");
    let revenueText = document.getElementById("totalRevenue");

    if (ownersNumber) ownersNumber.innerText = savedOwners.length;
    if (petsNumber) petsNumber.innerText = savedPets.length;
    if (appointmentsNumber) appointmentsNumber.innerText = savedAppointments.length;
    if (billsNumber) billsNumber.innerText = savedBills.length;

    // Add only Paid bills to the revenue.
    if (revenueText) {
        let totalRevenue = 0;

        savedBills.forEach(function(bill) {
            if (bill.status === "Paid") {
                totalRevenue += Number(bill.total);
            }
        });

        revenueText.innerText = "₹" + totalRevenue;
    }

    // Display all appointment records in the report.
    let appointmentReport = document.getElementById("reportAppointments");

    if (appointmentReport) {
        appointmentReport.innerHTML = "";

        savedAppointments.forEach(function(appointment) {
            appointmentReport.innerHTML += `
                <tr>
                    <td>${appointment.petName}</td>
                    <td>${appointment.ownerName}</td>
                    <td>${appointment.doctor}</td>
                    <td>${appointment.date}</td>
                    <td>${appointment.status}</td>
                </tr>
            `;
        });
    }

    // Display all bill records in the report.
    let billReport = document.getElementById("reportBills");

    if (billReport) {
        billReport.innerHTML = "";

        savedBills.forEach(function(bill) {
            billReport.innerHTML += `
                <tr>
                    <td>${bill.id}</td>
                    <td>${bill.petName}</td>
                    <td>${bill.ownerName}</td>
                    <td>₹${bill.total}</td>
                    <td>${bill.status}</td>
                </tr>
            `;
        });
    }
}

displayReports();
