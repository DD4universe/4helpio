function submitFeedback(event) {
    event.preventDefault();

    // Get user input values
    const name = document.getElementById("feedbackName").value.trim();
    const feedback = document.getElementById("feedbackMessage").value.trim();

    if (!name || !feedback) {
        alert("Please fill in all fields.");
        return;
    }

    
    const googleFormURL = "https://docs.google.com/forms/d/e/1FAIpQLSfmmeNHGNupcStCeRB_vGSong4V_nL9EES5xwBRQTyJCW9RLw/formResponse";

    // Prepare form data
    const formData = new FormData();
    formData.append("entry.846301261", name);
    formData.append("entry.90450812", feedback);

    // Submit the form using Fetch API
    fetch(googleFormURL, {
        method: "POST",
        body: formData,
        mode: "no-cors"
    }).then(() => {
        alert("Feedback submitted successfully!");
        document.getElementById("feedbackForm").reset();
    }).catch(error => {
        alert("Error submitting feedback. Please try again.");
    });
}
document.addEventListener('contextmenu', (e) => e.preventDefault());
     document.addEventListener('keydown', (e) => {
       if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')|| (e.ctrlKey && e.key==='U')) {
         e.preventDefault();
       }
     });
$(document).ready(function() {
    // Handle the filter form submission
    $("#filterForm").submit(function(event) {
        event.preventDefault();
        $("#loadingSpinner").show();

        var facilityType = $("#facilityType").val();
        var specialization = $("#specialization").val();
        var location = $("#location").val();

        // Show all items initially
        $(".facility").show();

        // Apply filters based on selected values
        if (facilityType !== "all") {
            $(".facility").not("." + facilityType).hide();
        }
        if (specialization !== "all") {
            $(".facility").not("." + specialization).hide();
        }
        if (location !== "all") {
            $(".facility").not("." + location).hide();
        }

        // Hide loading spinner after 1 second
        setTimeout(function() {
            $("#loadingSpinner").hide();
        }, 1000);
    });
});
$(document).ready(function () {
    // Hide all facility cards initially
    $(".facility").hide();

    $("#filterForm").submit(function (event) {
        event.preventDefault(); // Prevent page reload
        
        $("#loadingSpinner").show(); // Show loading spinner
        
        // Get selected values
        var selectedFacility = $("#facilityType").val();
        var selectedSpecialization = $("#specialization").val();
        var selectedLocation = $("#location").val();

        setTimeout(function () {
            $("#loadingSpinner").hide(); // Hide spinner after 500ms
            
            // Hide all facilities first
            $(".facility").hide();
            
            // Filter and show matching facilities
            $(".facility").filter(function () {
                var facilityMatch = (selectedFacility === "all") || $(this).hasClass(selectedFacility);
                var specializationMatch = (selectedSpecialization === "all") || $(this).hasClass(selectedSpecialization);
                var locationMatch = (selectedLocation === "all") || $(this).hasClass(selectedLocation);
                
                return facilityMatch && specializationMatch && locationMatch;
            }).show();
        }, 500); // Delay for smooth experience
    });
});

