document.addEventListener('contextmenu', (e) => e.preventDefault());
     document.addEventListener('keydown', (e) => {
       if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')|| (e.ctrlKey && e.key==='U')) {
         e.preventDefault();
       }
     });
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("doctorForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get form values
        const name = document.getElementById("name").value;
        const age = document.getElementById("age").value;
        const specialization = document.getElementById("specialization").value;
        const clinicName = document.getElementById("clinicName").value;
        const clinicAddress = document.getElementById("clinicAddress").value;
        const phoneNumber = document.getElementById("phoneNumber").value;
        const password = document.getElementById("password").value;

        // Validate form fields
        if (name && age && specialization && clinicName && clinicAddress && phoneNumber && password) {
            alert("Successfully submitted! Now upload your license.");

            // Prepare form data for Google Forms submission
            const formData = new FormData();
            formData.append("entry.2005620554", name);
            formData.append("entry.1045781291", age);
            formData.append("entry.660212268", specialization);
            formData.append("entry.2068650744", clinicName);
            formData.append("entry.1065046570", clinicAddress);
            formData.append("entry.1166974658", phoneNumber);
            formData.append("entry.839337160", password);

            // Submit form to Google Forms
            fetch("https://docs.google.com/forms/d/e/1FAIpQLSfo5CZlQCycr8f3cI61KnzhVwbDe1mAhEvM4V4qvCsMPV_saA/formResponse", {
                method: "POST",
                body: formData,
                mode: "no-cors"
            }).then(() => {
                form.reset();
                // Redirect to license upload form
                window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSczDr9yhFcsOCF76Ydwgbm57NIPGcHHU_KV1A5st0PjgMqTgQ/viewform?usp=header";
            }).catch(error => {
                alert("Error submitting form. Please try again.");
            });
        } else {
            alert("Enter correct data, please try again.");
        }
    });
});
