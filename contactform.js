document.addEventListener('contextmenu', (e) => e.preventDefault());
     document.addEventListener('keydown', (e) => {
       if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')|| (e.ctrlKey && e.key==='U')) {
         e.preventDefault();
       }
     });
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Get user input values
        const userName = document.getElementById("userName").value.trim();
        const userPhone = document.getElementById("userPhone").value.trim();
        const userMessage = document.getElementById("userMessage").value.trim();

        // Basic form validation
        if (!userName || !userPhone || !userMessage) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        if (!/^\d{10}$/.test(userPhone)) {
            alert("Enter a valid 10-digit mobile number.");
            return;
        }

        // Correct Google Form "formResponse" URL
        const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSeme8KOyfQQr59k_N9XTdu4ij3Ni0yaBn-BPzzKBSGN5Ig_1g/formResponse";

        // Create form data in URL format
        const formData = new URLSearchParams();
        formData.append("entry.1564655172", userName); // Name field
        formData.append("entry.1838297375", userPhone); // Mobile Number field
        formData.append("entry.831020359", userMessage); // Message field

        // Submit form using fetch
        fetch(formUrl, {
            method: "POST",
            body: formData,
            mode: "no-cors"
        })
        .then(() => {
            alert("Message sent successfully! A doctor will contact you soon.");
            form.reset();
        })
        .catch(() => {
            alert("Error submitting form. Please try again.");
        });
    });

    // Floating animation for icons
    document.querySelectorAll(".icon").forEach(icon => {
        icon.style.animationDuration = `${Math.random() * 5 + 10}s`;
        icon.style.animationDelay = `${Math.random() * 2}s`;
    });
});
