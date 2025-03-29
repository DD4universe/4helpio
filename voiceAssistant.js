// Step 1: Basic Voice Assistant Setup

// Check if browser supports Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ta-IN'; // Default Tamil, can switch to English dynamically
recognition.continuous = true;
recognition.interimResults = false;

// Text-to-Speech Setup
const speak = (message) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = 'ta-IN'; // Default Tamil
    window.speechSynthesis.speak(speech);
};

// Start Recognition Automatically on Website Load
window.onload = () => {
    speak("வணக்கம்! மொழியைத் தேர்வுசெய்க. Hello! Please select your language.");
    recognition.start();
};

// Process User Commands
recognition.onresult = (event) => {
    const userSpeech = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log("User said:", userSpeech);
    
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

// Handle Errors
recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
};
