document.addEventListener("DOMContentLoaded", function () {
    createFloatingIcons();
});

// List of doctors (you can add more in future)
const doctors = [
    { name: "Dr.John Doe", number: "9876543210", password: "password123" },
    { name: "Dr.Jane Smith", number: "9123456780", password: "securepass" },
    { name: "Dr.Emily Brown", number: "9001234567", password: "docpassword" }
];

function validateLogin() {
    const enteredName = document.getElementById("doctorName").value.trim();
    const enteredNumber = document.getElementById("doctorNumber").value.trim();
    const enteredPassword = document.getElementById("doctorPassword").value.trim();

    const doctor = doctors.find(doc => doc.name === enteredName && doc.number === enteredNumber && doc.password === enteredPassword);

    if (doctor) {
        alert("Login Successful!");
        window.location.href = "doctorcommunity.html"; // Redirect to doctor dashboard
    } else {
        alert("Invalid login credentials. Please try again.");
    }
}

// Floating Icons Animation
function createFloatingIcons() {
    const icons = [
        "https://cdn-icons-png.flaticon.com/512/2831/2831236.png",
        "https://cdn-icons-png.flaticon.com/512/2831/2831239.png",
        "https://cdn-icons-png.flaticon.com/512/2831/2831250.png",
        "https://cdn-icons-png.flaticon.com/512/2831/2831272.png"
    ];

    const floatingIconsContainer = document.querySelector(".floating-icons");

    for (let i = 0; i < 6; i++) {
        let icon = document.createElement("img");
        icon.src = icons[Math.floor(Math.random() * icons.length)];
        icon.className = "icon";
        icon.style.left = `${Math.random() * 100}%`;
        icon.style.animationDuration = `${10 + Math.random() * 10}s`;
        floatingIconsContainer.appendChild(icon);
    }
}
