document.addEventListener("DOMContentLoaded", () => {
    console.log("Voice Assistant is ready!");
    setTimeout(startAssistant, 2000); // Delay ensures page loads first
});

// Ensure compatibility
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "ta-IN"; // Default: Tamil
recognition.continuous = true;
recognition.interimResults = false;

// Function to speak text
const speak = (message, callback) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = recognition.lang;
    speech.onend = callback || function () {}; // Ensure next action starts after speaking
    window.speechSynthesis.speak(speech);
};

// Function to start the assistant
const startAssistant = () => {
    console.log("Starting Voice Assistant...");
    
    speak("Welcome! Please select your language. Say 'English' or 'தமிழ்'.", () => {
        recognition.start(); // Start listening **only after** speaking
    });
};

// Ensure the bot starts automatically **after user interaction** (fix for Chrome security)
document.addEventListener("DOMContentLoaded", () => {
    console.log("Voice Assistant is ready!");
    setTimeout(startAssistant, 2000); // Delay to ensure proper loading
});

// Handle voice commands
recognition.onresult = (event) => {
    const userSpeech = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log("User Command:", userSpeech);

    if (userSpeech.includes("english")) {
        recognition.lang = "en-IN";
        speak("Language set to English.");
    } else if (userSpeech.includes("தமிழ்")) {
        recognition.lang = "ta-IN";
        speak("மொழி தமிழ் ஆக அமைக்கப்பட்டது.");
    } else if (userSpeech.includes("go to doctor signup")) {
        speak("Redirecting to Doctor Signup Page.");
        window.location.href = "/doctor-signup.html";
    }
};

// Handle errors
recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
};
