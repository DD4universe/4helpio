document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get user input values
        const ownerName = document.getElementById("ownerName").value.trim();
        const ownerAge = document.getElementById("ownerAge").value.trim();
        const mobileNumber = document.getElementById("mobileNumber").value.trim();
        const shopName = document.getElementById("shopName").value.trim();
        const shopAddress = document.getElementById("shopAddress").value.trim();
        const shopContact = document.getElementById("shopContact").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validation check
        if (!ownerName || !ownerAge || !mobileNumber || !shopName || !shopAddress || !shopContact || !password) {
            alert("Please fill in all fields.");
            return;
        }

        // Google Form Submission URL (Replace 'viewform' with 'formResponse')
        const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSd66iW34yVAIacIorEmjHt5OL0-5oh6awGQ_XGpIScDG7MneQ/formResponse";

        // Form data mapping
        const formData = new FormData();
        formData.append("entry.2005620554", ownerName);
        formData.append("entry.754691513", ownerAge);
        formData.append("entry.1045781291", mobileNumber);
        formData.append("entry.1065046570", shopName);
        formData.append("entry.1166974658", shopAddress);
        formData.append("entry.1043752317", shopContact);
        formData.append("entry.494184040", password);  // Password stored securely in Google Sheet

        // Submit form
        fetch(formUrl, {
            method: "POST",
            body: formData,
            mode: "no-cors"
        }).then(() => {
            alert("Successfully submitted! Now, please upload your Medical Shop Certificate.");

            // Redirect to License Upload Form
            window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSdpRZLiiGe4GzGllCmdn5Yh6uA7Svkv8LhQkuQigpFRHSFlPA/formResponse";
            
            form.reset();
        }).catch(() => {
            alert("Error submitting form. Please try again.");
        });

    });

    // Floating animation fix
    const floatingIcons = document.querySelectorAll(".icon");
    floatingIcons.forEach(icon => {
        icon.style.animationDuration = `${Math.random() * 5 + 10}s`;
        icon.style.animationDelay = `${Math.random() * 2}s`;
    });

});
