// Ensure compatibility
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = "ta-IN"; // Default: Tamil
recognition.continuous = true;
recognition.interimResults = false;

let isAssistantActive = false; // Track assistant state
let backgroundNoiseThreshold = 0.02; // Adjust this if needed (lower = stricter noise filtering)

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
    isAssistantActive = true;
    speak("Welcome! Please select your language. Say 'English' or 'தமிழ்'.", () => {
        recognition.start(); // Start listening after greeting
    });
};

// Wake Word Detection ("Hey Doctor")
const wakeRecognition = new SpeechRecognition();
wakeRecognition.lang = "en-IN";
wakeRecognition.continuous = true;
wakeRecognition.interimResults = false;

wakeRecognition.onresult = (event) => {
    const userSpeech = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log("Wake Word Detected:", userSpeech);

    if (userSpeech.includes("hey doctor")) {
        isAssistantActive = true;
        speak("How can I assist you?", () => {
            recognition.start();
        });
    }
};

// Function to filter background noise
const filterNoise = (audioData) => {
    let sum = 0;
    for (let i = 0; i < audioData.length; i++) {
        sum += Math.abs(audioData[i]);
    }
    let average = sum / audioData.length;
    return average > backgroundNoiseThreshold;
};

// Integrate Noise Filtering with Speech Recognition
navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    setInterval(() => {
        analyser.getByteFrequencyData(dataArray);
        if (filterNoise(dataArray)) {
            console.log("Significant speech detected, allowing recognition...");
        } else {
            console.log("Background noise detected, ignoring input.");
            recognition.abort(); // Stop recognition if only background noise is detected
        }
    }, 500);
});

// Ensure the bot starts automatically after page load
document.addEventListener("DOMContentLoaded", () => {
    console.log("Voice Assistant is ready!");
    setTimeout(startAssistant, 2000); // Delay ensures page loads first
    wakeRecognition.start(); // Always listen for "Hey Doctor"
});

// Handle voice commands
recognition.onresult = (event) => {
    if (!isAssistantActive) return;

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
