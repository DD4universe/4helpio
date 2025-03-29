// Step 2: Auto-Start Voice Assistant with Greeting

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'ta-IN'; // Default language: Tamil
recognition.continuous = true;
recognition.interimResults = false;

const speak = (message) => {
    return new Promise((resolve) => {
        const speech = new SpeechSynthesisUtterance(message);
        speech.lang = recognition.lang;
        speech.onend = resolve; // Ensure speech finishes before starting recognition
        window.speechSynthesis.speak(speech);
    });
};

// Start voice assistant after page loads & microphone access is granted
window.onload = async () => {
    try {
        await speak("Welcome! Please select your language. Say 'English' or 'தமிழ்'.");
        recognition.start(); // Start listening after greeting
    } catch (error) {
        console.error("Speech synthesis error:", error);
    }
};

recognition.onresult = async (event) => {
    const userSpeech = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log("User Command:", userSpeech);

    if (userSpeech.includes("english")) {
        recognition.lang = 'en-IN';
        await speak("Language set to English.");
    } else if (userSpeech.includes("தமிழ்")) {
        recognition.lang = 'ta-IN';
        await speak("மொழி தமிழ் ஆக அமைக்கப்பட்டது.");
    } else if (userSpeech.includes("go to doctor signup")) {
        await speak("Redirecting to Doctor Signup Page.");
        window.location.href = "/doctor-signup.html";
    }
};

recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
};
