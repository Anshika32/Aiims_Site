const SUPABASE_URL = "https://lbjtmpivtytwniepxslm.supabase.co";
        const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxianRtcGl2dHl0d25pZXB4c2xtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDA4MDE1NiwiZXhwIjoyMDU1NjU2MTU2fQ.HTjMWLgT4_a7KevBKaImyBkxMm5anFiHbGf4AwKMI4w";
        
        const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        console.log("Supabase initialized:", supabase);
        

        const authContainer = document.getElementById("auth-container");
        const mainSite = document.getElementById("main-site");
        const logoutBtn = document.getElementById("logout");

        // Ensure the elements exist before using them
        if (!authContainer || !mainSite || !logoutBtn) {
        console.error("Error: One or more required elements are missing in the DOM.");
        }


        document.addEventListener("DOMContentLoaded", async () => {
        
            const { data: session } = await supabase.auth.getSession();
        
            console.log("Session Data:", session);
            console.log("Auth Container:", authContainer); // Debugging
        
            if (session && session.user) {
                authContainer.style.display = "none";
                mainSite.style.display = "block";
            } else {
                authContainer.style.display = "block";
                mainSite.style.display = "none";
            }
        
            logoutBtn.addEventListener("click", async () => {
                await supabase.auth.signOut();
                localStorage.removeItem("loggedIn");
                if (authContainer) authContainer.style.display = "block";
                if (mainSite) mainSite.style.display = "none";
                window.location.href = "login.html"; 
            });
        });
        
    
        
        const actionSelect = document.getElementById("action");
        const nameField = document.getElementById("name");
        const emailField = document.getElementById("email");
        const passwordField = document.getElementById("password");
        const submitButton = document.getElementById("submit");
        const logoutButton = document.getElementById("logout");
        const message = document.getElementById("message");
        
        actionSelect.addEventListener("change", () => {
            nameField.classList.toggle("hidden", actionSelect.value === "Login");
        });
        
        submitButton.addEventListener("click", async () => {
            if (!supabase || !supabase.auth) {
                console.error("Supabase is not initialized properly!");
                message.textContent = "Supabase is not initialized. Please try again.";
                return;
            }
        
            const action = actionSelect.value;
            const email = emailField.value;
            const password = passwordField.value;
            const name = nameField.value;
        
            if (!email || !password || (action === "Signup" && !name)) {
                message.textContent = "Please fill all fields.";
                return;
            }
        
            if (action === "Signup") {
                console.log("Attempting to sign up...");
                try {
                    const { data, error } = await supabase.auth.signUp({ email, password, options: { email_confirm: true } });
                    // console.log("Signup Response:", data, error);
                    if (error) {
                        message.textContent = error.message;
                    } else {
                        await supabase.from("users").insert({ 
                            name, 
                            email 
                            // signup_time: new Date().toISOString(), 
                            // login_count: 0, 
                            // total_time_spent: 0 
                        });
                        message.textContent = "Signup successful! Please verify your email. A verification link has been sent to your email.";
                    }
                } catch (err) {
                    console.error("Signup error:", err);
                    message.textContent = "An error occurred. Please try again.";
                }
            } else {
                try {
                    const { data, error } = await supabase.auth.signInWithPassword({
                        email,
                        password,
                    });
        
                    if (error) {
                        message.textContent = "Invalid email or password.";
                    } else {
                        message.textContent = "Login successful!";
                        localStorage.setItem("loggedIn", "true"); // Store login flag
        
                        authContainer.style.display = "none";
                        mainSite.style.display = "block";
        
                        logoutButton.classList.remove("hidden");
                        submitButton.classList.add("hidden");
                    }
                } catch (err) {
                    console.error("Login error:", err);
                    message.textContent = "An error occurred. Please try again.";
                }
            }
        });
        
        
        logoutButton.addEventListener("click", async () => {
            await supabase.auth.signOut();
            localStorage.removeItem("loggedIn");
            sessionStorage.clear();
        
            message.textContent = "Logged out successfully!";
            logoutButton.classList.add("hidden");
            submitButton.classList.remove("hidden");
        
            // Redirect to login page
            window.location.href = "login.html"; // Change this to your actual login page
        });
        
        function logoutUser() {
            // Clear session storage
            sessionStorage.clear();
        
            // Redirect to login page
            window.location.href = "login.html";
        }
        
        




































// Function to toggle sections
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Function to show video based on language selection
function showVideo(language) {
    // let videoContainer = document.getElementById('video-container');
    let videoSource = document.getElementById('video-source');
    let videoElement = document.getElementById('instructional-video');

    if (language === 'bengali') {
        videoSource.src = 'bse_video_bengali.mp4';  // Replace with actual file
    } else {
        videoSource.src = 'bse_video_hindi.webm';  // Replace with actual file
    }

    videoElement.load(); // Reload video with new source
}

// Load Hindi Video by Default
document.addEventListener('DOMContentLoaded', function () {
    showVideo('hindi');
});



// Slideshow Logic for Techniques Section
const images = [
    "Slide1.PNG",
    "Slide2.PNG",
    "Slide3.PNG",
    "Slide4.PNG",
    "Slide5.PNG",
    "Slide6.PNG",
    "Slide7.PNG"
];

let currentIndex = 0;
let intervalId = null;

const slideshowImage = document.getElementById("slideshow-image");
const caption = document.getElementById("caption");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");

function updateSlide() {
    slideshowImage.src = images[currentIndex];
    caption.textContent =`Technique of Palpation (${currentIndex + 1}/${images.length})`;
}


function startSlideshow() {
    if (intervalId) return; // Prevent multiple intervals
    intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        updateSlide();
    }, 5000); // Change image every 5 seconds
}

function stopSlideshow() {
    clearInterval(intervalId);
    intervalId = null;
}

// Event Listeners for Slideshow Buttons
startBtn.addEventListener("click", startSlideshow);
stopBtn.addEventListener("click", stopSlideshow);


async function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (!userInput.trim()) return;

    displayMessage(userInput, "user");

    document.getElementById("user-input").value = "";

    const apiKey = "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";  // Store this securely
    const apiUrl = "https://api.groq.com/openai/v1/chat/completions";

    const requestBody = {
        model: "llama-3.2-90b-vision-preview",
        messages: [
            {
                role: "system",
                content: "Answer only the question asked. Keep responses concise and avoid unnecessary details."
            },
            { 
                role: "user", 
                content: userInput 
            }
        ],
        temperature: 0.5,  // Lower temperature for more direct responses
        max_tokens: 300     // Reduce token limit to prevent excessive info
    };
    
    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization":`Bearer ${apiKey}`
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        const botReply = data.choices[0].message.content;
        displayMessage(botReply, "bot");
    } catch (error) {
        console.error("Error:", error);
        displayMessage("Sorry, I couldn't process your request.", "bot");
    }
}


function displayMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message", sender === "user" ? "user-message" : "bot-message");

    // Convert Markdown-like syntax to HTML
    message = message
        .replace(/\\(.?)\\*/g, "<strong>$1</strong>") // Bold text
        .replace(/\n/g, "<br>") // Preserve new lines
        .replace(/\d+\.\s/g, "<br>• "); // Convert numbered lists to bullets

    messageDiv.innerHTML = message; // Use innerHTML to render formatted text
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}



document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {  
        event.preventDefault();  // Prevent new line (important)
        document.getElementById("send-btn").click();  // Click the send button
    }
});






document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const successMessage = document.getElementById("success-message");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        const formData = new FormData(form);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                successMessage.style.display = "block"; // Show success message
                form.reset(); // Clear form fields
                setTimeout(() => {
                    successMessage.style.display = "none"; // Hide after 5 seconds
                }, 5000);
            } else {
                alert("Something went wrong. Please try again.");
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred. Please try again.");
        });
    });

    document.getElementById("contact-form").addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevents default behavior (like new line in textarea)
            document.getElementById("send-btn").click(); // Simulate button click
        }
    });
});