// frontend/static/script.js
document.addEventListener("DOMContentLoaded", () => {
  const smokeOverlay = document.getElementById("smoke-overlay");
  const mainContent = document.getElementById("main-content");

  // Wait for animation to complete before revealing content
  setTimeout(() => {
      smokeOverlay.style.display = "none";
      mainContent.style.opacity = "1";
  }, 3000);

  const chatWindow = document.getElementById("chat-window");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  // Helper function to display messages
  function addMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender);
    msgDiv.textContent = text;
    chatWindow.appendChild(msgDiv);
    // Optional: slight scroll animation or just scroll to bottom
    chatWindow.scrollTo({
      top: chatWindow.scrollHeight,
      behavior: "smooth"
    });
  }

  // Send user input to the backend
  async function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    // Display the user's message
    addMessage(text, "user");
    userInput.value = "";

    // Make the POST request to the backend
    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });
      const data = await response.json();
      // Display the bot's reply
      addMessage(data.response, "bot");
    } catch (error) {
      console.error("Error:", error);
      addMessage("Sorry, something went wrong!", "bot");
    }
  }

  // Event listener for Send button
  sendBtn.addEventListener("click", sendMessage);

  // Event listener for pressing Enter in the input
  userInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
});
