document.addEventListener('contextmenu', (e) => e.preventDefault());
     document.addEventListener('keydown', (e) => {
       if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
         e.preventDefault();
       }
     });
document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("searchForm");
    const requestForm = document.getElementById("requestForm");
    const searchResults = document.getElementById("searchResults");

    let availableMedicines = [
        { name: "Paracetamol", location: "city1", clinic: "Clinic A", contact: "1234567890" },
        { name: "Ibuprofen", location: "city2", clinic: "Clinic B", contact: "9876543210" }
    ];

    searchForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const medicineName = document.getElementById("medicine").value.toLowerCase();
        const location = document.getElementById("location").value;

        const results = availableMedicines.filter(med =>
            med.name.toLowerCase() === medicineName &&
            (location === "all" || med.location === location)
        );

        searchResults.innerHTML = results.length ? results.map(med => `
            <p><strong>${med.name}</strong> is available at <strong>${med.clinic}</strong> (📞 ${med.contact})</p>
        `).join("") : "<p>No medicine found. You can request it below.</p>";
    });

    requestForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const requestedMedicine = document.getElementById("requestMedicine").value;
        
        let formData = new FormData();
        formData.append("entry.839337160", requestedMedicine); // Medicine Name (Google Form)

        fetch("https://docs.google.com/forms/d/e/1FAIpQLSfvJxdGhkBlSEFw-KeXvqLFrhrOm4TTJjVOZLIFOVaZTRFyQg/formResponse", {
            method: "POST",
            body: formData,
            mode: "no-cors"
        }).then(() => {
            alert("Medicine request submitted successfully!");
        }).catch(() => {
            alert("Error submitting request.");
        });
    });
});
