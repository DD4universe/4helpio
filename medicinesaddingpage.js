document.addEventListener('contextmenu', (e) => e.preventDefault());
     document.addEventListener('keydown', (e) => {
       if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')|| (e.ctrlKey && e.key==='U')) {
         e.preventDefault();
       }
     });
document.addEventListener("DOMContentLoaded", () => {
    const medicineContainer = document.getElementById("medicineContainer");
    const addMedicineBtn = document.getElementById("addMedicine");
    const form = document.getElementById("medicineForm");
    const availableMedicinesDiv = document.getElementById("availableMedicines");

    const availableMedicines = ["Paracetamol", "Ibuprofen", "Amoxicillin", "Cough Syrup", "Antibiotics"];

    function displayAvailableMedicines() {
        availableMedicinesDiv.innerHTML = "";
        availableMedicines.forEach((medicine) => {
            const div = document.createElement("div");
            div.className = "medicine-item";
            div.innerHTML = `
                <span>${medicine}</span>
                <button onclick="confirmMedicine('${medicine}')">I Have This Medicine</button>
            `;
            availableMedicinesDiv.appendChild(div);
        });
    }

    window.confirmMedicine = (medicineName) => {
        const name = document.getElementById("name").value;
        const clinicName = document.getElementById("clinicName").value;
        const clinicAddress = document.getElementById("clinicAddress").value;
        const phone = document.getElementById("phone").value;

        if (!name || !clinicName || !clinicAddress || !phone) {
            alert("Please fill in your details first before confirming a medicine.");
            return;
        }

        const count = prompt(`Enter available count for ${medicineName}:`);
        if (!count || isNaN(count) || count <= 0) {
            alert("Please enter a valid medicine count.");
            return;
        }

        let formData = new FormData();
        formData.append("entry.2005620554", name);
        formData.append("entry.1045781291", clinicName);
        formData.append("entry.1065046570", clinicAddress);
        formData.append("entry.1166974658", phone);
        formData.append("entry.839337160", medicineName);
        formData.append("entry.1410780397", count);

        fetch("https://docs.google.com/forms/d/e/1FAIpQLSfvJxdGhkBlSEFw-KeXvqLFrhrOm4TTJjVOZLIFOVaZTRFyQg/formResponse", {
            method: "POST",
            body: formData,
            mode: "no-cors"
        }).then(() => {
            alert(`Medicine ${medicineName} with count ${count} has been registered successfully.`);
        }).catch(() => {
            alert("Error submitting data.");
        });
    };

    addMedicineBtn.addEventListener("click", () => {
        const medicineEntry = document.createElement("div");
        medicineEntry.className = "medicine-entry";
        medicineEntry.innerHTML = `
            <label for="medicineName">Medicine Name:</label>
            <input type="text" class="medicineName" required>

            <label for="count">Count:</label>
            <input type="number" class="medicineCount" required>

            <button type="button" class="removeMedicine">Remove</button>
        `;
        medicineContainer.appendChild(medicineEntry);

        medicineEntry.querySelector(".removeMedicine").addEventListener("click", () => {
            medicineEntry.remove();
        });
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const clinicName = document.getElementById("clinicName").value;
        const clinicAddress = document.getElementById("clinicAddress").value;
        const phone = document.getElementById("phone").value;
        const medicineNames = Array.from(document.querySelectorAll(".medicineName")).map(input => input.value);
        const medicineCounts = Array.from(document.querySelectorAll(".medicineCount")).map(input => input.value);

        let formData = new FormData();
        formData.append("entry.2005620554", name);
        formData.append("entry.1045781291", clinicName);
        formData.append("entry.1065046570", clinicAddress);
        formData.append("entry.1166974658", phone);

        medicineNames.forEach((med, index) => {
            formData.append("entry.839337160", med);
            formData.append("entry.1410780397", medicineCounts[index]);
        });

        fetch("https://docs.google.com/forms/d/e/1FAIpQLSfvJxdGhkBlSEFw-KeXvqLFrhrOm4TTJjVOZLIFOVaZTRFyQg/formResponse", {
            method: "POST",
            body: formData,
            mode: "no-cors"
        }).then(() => {
            alert("Submitted successfully!");
            form.reset();
        }).catch(() => {
            alert("Error submitting form.");
        });
    });

    displayAvailableMedicines();
});
document.addEventListener("DOMContentLoaded", () => {
    const neededMedicineList = document.getElementById("neededMedicineList");

    let neededMedicines = ["Requested Medicine 1", "Requested Medicine 2"]; // Fetch from Google Sheets dynamically if possible

    function displayNeededMedicines() {
        neededMedicineList.innerHTML = neededMedicines.length ? neededMedicines.map(med => `
            <li>${med}</li>
        `).join("") : "<p>No requested medicines.</p>";
    }

    displayNeededMedicines();
});
