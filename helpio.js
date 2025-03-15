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

