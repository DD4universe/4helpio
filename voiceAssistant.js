// Step 2: Auto-Start Voice Assistant with Proper Timing

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ta-IN'; // Default language: Tamil
recognition.continuous = true;
recognition.interimResults = false;

const speak = (message, callback) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = recognition.lang;
    speech.onend = callback || function() {}; // Wait for speech to end before next action
    window.speechSynthesis.speak(speech);
};

// Ensure voice starts **AFTER user interaction** (needed for Chrome security)
document.addEventListener("click", function startAssistant() {
    document.removeEventListener("click", startAssistant); // Remove event after first click

    speak("Welcome! Please select your language. Say 'English' or 'தமிழ்'.", () => {
        recognition.start(); // Start listening only after greeting
    });
});

recognition.onresult = (event) => {
    const userSpeech = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log("User Command:", userSpeech);

    if (userSpeech.includes("english")) {
        recognition.lang = 'en-IN';
        speak("Language set to English.");
    } else if (userSpeech.includes("தமிழ்")) {
        recognition.lang = 'ta-IN';
        speak("மொழி தமிழ் ஆக அமைக்கப்பட்டது.");
    } else if (userSpeech.includes("go to doctor signup")) {
        speak("Redirecting to Doctor Signup Page.");
        window.location.href = "/doctor-signup.html";
    }
};

recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
};
