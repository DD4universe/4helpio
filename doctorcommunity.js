document.addEventListener('contextmenu', (e) => e.preventDefault());
     document.addEventListener('keydown', (e) => {
       if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')|| (e.ctrlKey && e.key==='U')) {
         e.preventDefault();
       }
     });
document.addEventListener("DOMContentLoaded", function () {
    const patients = [
        { name: "Alice", problem: "Severe headache" },
        { name: "Bob", problem: "Fever and chills" },
        { name: "Charlie", problem: "Stomach pain" }
    ];

    const patientList = document.getElementById("patientList");

    patients.forEach((patient, index) => {
        const patientDiv = document.createElement("div");
        patientDiv.classList.add("patient");
        patientDiv.innerHTML = `<strong>${patient.name}</strong>: ${patient.problem} 
                                <button onclick="claimPatient(${index})">I'm Suitable</button>`;
        patientList.appendChild(patientDiv);
    });
});

function claimPatient(index) {
    alert(`You have selected patient ${index + 1}. The team will be notified.`);
}
