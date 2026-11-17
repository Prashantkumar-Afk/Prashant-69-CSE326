
// ==========================================
// 1. OWNER MANAGEMENT
// ==========================================

let ownerForm = document.getElementById("ownerForm");
let owners = JSON.parse(localStorage.getItem("owners")) || [];

function displayOwners() {
    let ownerList = document.getElementById("ownerList");

    if (!ownerList) return;

    ownerList.innerHTML = "";

    owners.forEach(function(owner, index) {
        ownerList.innerHTML += `
            <tr>
                <td>${owner.id}</td>
                <td>${owner.name}</td>
                <td>${owner.phone}</td>
                <td>${owner.email}</td>
                <td>
                    <button onclick="deleteOwner(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

if (ownerForm) {
    ownerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let name = document.getElementById("ownerName").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let address = document.getElementById("address").value;

        let newOwner = {
            id: Date.now(),
            name: name,
            phone: phone,
            email: email,
            address: address
        };

        owners.push(newOwner);

        localStorage.setItem("owners", JSON.stringify(owners));

        alert("Owner registered successfully!");

        ownerForm.reset();
        displayOwners();
    });
}

function deleteOwner(index) {
    if (confirm("Are you sure you want to delete this owner?")) {
        owners.splice(index, 1);

        localStorage.setItem("owners", JSON.stringify(owners));

        displayOwners();
    }
}

displayOwners();


// ==========================================
// 2. OWNER SEARCH
// ==========================================

let searchOwner = document.getElementById("searchOwner");

if (searchOwner) {
    searchOwner.addEventListener("input", function() {

        let searchValue = searchOwner.value.toLowerCase();
        let ownerList = document.getElementById("ownerList");

        ownerList.innerHTML = "";

        let filteredOwners = owners.filter(function(owner) {
            return owner.name.toLowerCase().includes(searchValue) ||
                   owner.phone.includes(searchValue);
        });

        filteredOwners.forEach(function(owner) {

            let index = owners.findIndex(function(item) {
                return item.id === owner.id;
            });

            ownerList.innerHTML += `
                <tr>
                    <td>${owner.id}</td>
                    <td>${owner.name}</td>
                    <td>${owner.phone}</td>
                    <td>${owner.email}</td>
                    <td>
                        <button onclick="deleteOwner(${index})">Delete</button>
                    </td>
                </tr>
            `;
        });
    });
}


// ==========================================
// 3. PET MANAGEMENT
// ==========================================

let petForm = document.getElementById("petForm");
let pets = JSON.parse(localStorage.getItem("pets")) || [];
let savedOwners = JSON.parse(localStorage.getItem("owners")) || [];

function loadOwners() {
    let petOwner = document.getElementById("petOwner");

    if (!petOwner) return;

    petOwner.innerHTML = '<option value="">Select Owner</option>';

    savedOwners = JSON.parse(localStorage.getItem("owners")) || [];

    savedOwners.forEach(function(owner) {
        petOwner.innerHTML += `
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
                <td>
                    <button onclick="deletePet(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

if (petForm) {
    loadOwners();

    petForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let name = document.getElementById("petName").value;
        let type = document.getElementById("petType").value;
        let breed = document.getElementById("breed").value;
        let age = document.getElementById("age").value;
        let gender = document.getElementById("gender").value;
        let ownerId = document.getElementById("petOwner").value;

        let selectedOwner = savedOwners.find(function(owner) {
            return owner.id == ownerId;
        });

        if (!selectedOwner) {
            alert("Please select a valid owner.");
            return;
        }

        let newPet = {
            id: Date.now(),
            name: name,
            type: type,
            breed: breed,
            age: age,
            gender: gender,
            ownerId: ownerId,
            ownerName: selectedOwner.name
        };

        pets.push(newPet);

        localStorage.setItem("pets", JSON.stringify(pets));

        alert("Pet registered successfully!");

        petForm.reset();
        displayPets();
        loadOwners();
    });
}

function deletePet(index) {
    if (confirm("Are you sure you want to delete this pet?")) {
        pets.splice(index, 1);

        localStorage.setItem("pets", JSON.stringify(pets));

        displayPets();
    }
}

displayPets();


// ==========================================
// 4. APPOINTMENT MANAGEMENT
// ==========================================

let appointmentForm = document.getElementById("appointmentForm");
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let savedPets = JSON.parse(localStorage.getItem("pets")) || [];

function loadPets() {
    let appointmentPet = document.getElementById("appointmentPet");

    if (!appointmentPet) return;

    appointmentPet.innerHTML = '<option value="">Select Pet</option>';

    savedPets = JSON.parse(localStorage.getItem("pets")) || [];

    savedPets.forEach(function(pet) {
        appointmentPet.innerHTML += `
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

                <td>
                    <button onclick="cancelAppointment(${index})">Cancel</button>
                </td>
            </tr>
        `;
    });
}

if (appointmentForm) {
    loadPets();

    let appointmentPet = document.getElementById("appointmentPet");

    if (appointmentPet) {
        appointmentPet.addEventListener("change", function() {

            let selectedPet = savedPets.find(function(pet) {
                return pet.id == appointmentPet.value;
            });

            document.getElementById("appointmentOwner").value =
                selectedPet ? selectedPet.ownerName : "";
        });
    }

    appointmentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let petId = document.getElementById("appointmentPet").value;

        let selectedPet = savedPets.find(function(pet) {
            return pet.id == petId;
        });

        if (!selectedPet) {
            alert("Please select a valid pet.");
            return;
        }

        let doctor = document.getElementById("doctor").value;
        let date = document.getElementById("appointmentDate").value;
        let time = document.getElementById("appointmentTime").value;
        let reason = document.getElementById("reason").value;

        let newAppointment = {
            id: Date.now(),
            petName: selectedPet.name,
            ownerName: selectedPet.ownerName,
            doctor: doctor,
            date: date,
            time: time,
            reason: reason,
            status: "Pending"
        };

        appointments.push(newAppointment);

        localStorage.setItem("appointments", JSON.stringify(appointments));

        alert("Appointment booked successfully!");

        appointmentForm.reset();

        document.getElementById("appointmentOwner").value = "";

        displayAppointments();
        loadPets();
    });
}

function updateAppointmentStatus(index, newStatus) {
    appointments[index].status = newStatus;

    localStorage.setItem("appointments", JSON.stringify(appointments));

    displayAppointments();

    alert("Appointment status updated!");
}

function cancelAppointment(index) {
    if (confirm("Are you sure you want to cancel this appointment?")) {
        appointments.splice(index, 1);

        localStorage.setItem("appointments", JSON.stringify(appointments));

        displayAppointments();
    }
}

displayAppointments();


// ==========================================
// 5. BILLING MANAGEMENT
// ==========================================

let billingForm = document.getElementById("billingForm");
let bills = JSON.parse(localStorage.getItem("bills")) || [];
let billingPets = JSON.parse(localStorage.getItem("pets")) || [];

function loadBillingPets() {
    let billPet = document.getElementById("billPet");

    if (!billPet) return;

    billPet.innerHTML = '<option value="">Select Pet</option>';

    billingPets = JSON.parse(localStorage.getItem("pets")) || [];

    billingPets.forEach(function(pet) {
        billPet.innerHTML += `
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
                <td>
                    <button onclick="printBill(${bill.id})">Print</button>
                </td>
            </tr>
        `;
    });
}

if (billingForm) {
    loadBillingPets();

    let billPet = document.getElementById("billPet");

    if (billPet) {
        billPet.addEventListener("change", function() {

            let selectedPet = billingPets.find(function(pet) {
                return pet.id == billPet.value;
            });

            document.getElementById("billOwner").value =
                selectedPet ? selectedPet.ownerName : "";
        });
    }

    billingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let petId = document.getElementById("billPet").value;

        let selectedPet = billingPets.find(function(pet) {
            return pet.id == petId;
        });

        if (!selectedPet) {
            alert("Please select a valid pet.");
            return;
        }

        let consultation = Number(document.getElementById("consultationFee").value) || 0;
        let medicine = Number(document.getElementById("medicineFee").value) || 0;
        let other = Number(document.getElementById("otherFee").value) || 0;
        let status = document.getElementById("paymentStatus").value;

        let newBill = {
            id: Date.now(),
            petName: selectedPet.name,
            ownerName: selectedPet.ownerName,
            consultation: consultation,
            medicine: medicine,
            other: other,
            total: consultation + medicine + other,
            status: status
        };

        bills.push(newBill);

        localStorage.setItem("bills", JSON.stringify(bills));

        alert("Bill generated successfully!");

        billingForm.reset();

        document.getElementById("billOwner").value = "";

        displayBills();
        loadBillingPets();
    });
}

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
        <html>
        <head>
            <title>PetCare Clinic Bill</title>
            <style>
                body {
                    font-family: Arial;
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


// ==========================================
// 6. DASHBOARD STATISTICS
// ==========================================

let dashboardOwners = JSON.parse(localStorage.getItem("owners")) || [];
let dashboardPets = JSON.parse(localStorage.getItem("pets")) || [];
let dashboardAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
let dashboardBills = JSON.parse(localStorage.getItem("bills")) || [];

let totalOwners = document.getElementById("totalOwners");

if (totalOwners) {
    totalOwners.innerText = dashboardOwners.length;
}

let totalPets = document.getElementById("totalPets");

if (totalPets) {
    totalPets.innerText = dashboardPets.length;
}

let totalAppointments = document.getElementById("totalAppointments");

if (totalAppointments) {
    totalAppointments.innerText = dashboardAppointments.length;
}

let pendingBills = document.getElementById("pendingBills");

if (pendingBills) {
    let pendingCount = dashboardBills.filter(function(bill) {
        return bill.status === "Pending";
    }).length;

    pendingBills.innerText = pendingCount;
}


// ==========================================
// 7. REPORTS MANAGEMENT
// ==========================================

let reportOwners = JSON.parse(localStorage.getItem("owners")) || [];
let reportPets = JSON.parse(localStorage.getItem("pets")) || [];
let reportAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
let reportBills = JSON.parse(localStorage.getItem("bills")) || [];

let reportTotalOwners = document.getElementById("totalOwners");

if (reportTotalOwners) {
    reportTotalOwners.innerText = reportOwners.length;
}

let reportTotalPets = document.getElementById("totalPets");

if (reportTotalPets) {
    reportTotalPets.innerText = reportPets.length;
}

let reportTotalAppointments = document.getElementById("totalAppointments");

if (reportTotalAppointments) {
    reportTotalAppointments.innerText = reportAppointments.length;
}

let totalBills = document.getElementById("totalBills");

if (totalBills) {
    totalBills.innerText = reportBills.length;
}

// Calculate total revenue from paid bills

let totalRevenue = document.getElementById("totalRevenue");

if (totalRevenue) {
    let revenue = 0;

    reportBills.forEach(function(bill) {
        if (bill.status === "Paid") {
            revenue += Number(bill.total);
        }
    });

    totalRevenue.innerText = "₹" + revenue;
}

// Display appointment report

let reportAppointmentList = document.getElementById("reportAppointments");

if (reportAppointmentList) {
    reportAppointmentList.innerHTML = "";

    reportAppointments.forEach(function(appointment) {
        reportAppointmentList.innerHTML += `
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

// Display billing report

let reportBillList = document.getElementById("reportBills");

if (reportBillList) {
    reportBillList.innerHTML = "";

    reportBills.forEach(function(bill) {
        reportBillList.innerHTML += `
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
