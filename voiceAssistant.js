// Voice Assistant - Always Active & Responds to "Hey Doctor"

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "ta-IN"; // Default Language: Tamil
recognition.continuous = true;
recognition.interimResults = false;

let isAssistantActive = false;

// Function to make the assistant speak
const speak = (message, callback = null) => {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = recognition.lang;
    window.speechSynthesis.speak(speech);

    speech.onend = () => {
        if (callback) callback();
        else recognition.start(); // Restart recognition after speaking
    };
};

// Auto-start assistant when the page loads
window.onload = () => {
    setTimeout(() => {
        isAssistantActive = true;
        speak("Hello! Welcome to our website. Please choose a language: English or Tamil.");
    }, 2000); // Small delay to ensure the page loads properly
};

// Wake Word Detection - Always Listening for "Hey Doctor"
const wakeWordRecognition = new SpeechRecognition();
wakeWordRecognition.lang = "en-IN"; // Listening for wake word in English
wakeWordRecognition.continuous = true;
wakeWordRecognition.interimResults = false;

wakeWordRecognition.onresult = (event) => {
    const userSpeech = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log("User said:", userSpeech);

    if (userSpeech.includes("hey doctor")) {
        isAssistantActive = true;
        speak("Yes, I am here! How can I help you?", () => recognition.start());
    }
};

wakeWordRecognition.start(); // Start wake word listener

// Main Assistant Voice Command Handling
recognition.onresult = (event) => {
    if (!isAssistantActive) return;

    const userSpeech = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log("User Command:", userSpeech);

    // Language Selection
    if (userSpeech.includes("english")) {
        recognition.lang = "en-IN";
        speak("Language set to English.");
    } else if (userSpeech.includes("தமிழ்")) {
        recognition.lang = "ta-IN";
        speak("மொழி தமிழ் ஆக அமைக்கப்பட்டது.");
    }
    
    // Navigation Commands
    else if (userSpeech.includes("go to doctor signup")) {
        speak("Redirecting to Doctor Signup Page.", () => {
            window.location.href = "/doctor-signup.html";
        });
    } else if (userSpeech.includes("go to login")) {
        speak("Opening login page.", () => {
            window.location.href = "/login.html";
        });
    } else if (userSpeech.includes("home page")) {
        speak("Returning to Home Page.", () => {
            window.location.href = "/index.html";
        });
    }

    // Unknown Command
    else {
        speak("Sorry, I didn't understand that.");
    }
};

// Keep Microphone Active After Each Command
recognition.onend = () => {
    console.log("Microphone turned off. Restarting recognition...");
    if (isAssistantActive) {
        recognition.start(); // Keep listening
    }
};

// Restart on Error
recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
    if (event.error !== "no-speech") {
        recognition.start();
    }
};
