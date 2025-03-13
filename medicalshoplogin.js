document.addEventListener('contextmenu', (e) => e.preventDefault());
     document.addEventListener('keydown', (e) => {
       if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
         e.preventDefault();
       }
     });
document.addEventListener("DOMContentLoaded", function () {
    createFloatingIcons();
});

// List of medical shop owners (add more in future)
const medicalShops = [
    { name: "medicalshop", mobile: "9876543210", password: "shop123" },
    { name: "durai", mobile: "9876543210", password: "shop123" }
];

function validateLogin() {
    let name = document.getElementById("name").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let password = document.getElementById("password").value.trim();

    if (name === "" || mobile === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    const shop = medicalShops.find(shop => shop.name === name && shop.mobile === mobile && shop.password === password);

    if (shop) {
        alert("Login Successful!");
        window.location.href = "medicinesaddingpage.html";  // Redirect to order page
    } else {
        alert("Invalid credentials. Try again.");
    }
}

// Floating Icons Animation
function createFloatingIcons() {
    const icons = [
        "https://cdn-icons-png.flaticon.com/512/2913/2913105.png",
        "https://cdn-icons-png.flaticon.com/512/2913/2913103.png",
        "https://cdn-icons-png.flaticon.com/512/2913/2913124.png",
        "https://cdn-icons-png.flaticon.com/512/2913/2913143.png"
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
