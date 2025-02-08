// frontend/static/script.js

document.addEventListener("DOMContentLoaded", () => {
    const chatWindow = document.getElementById("chat-window");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
  
    // Helper function to display messages
    function addMessage(text, sender) {
      const msgDiv = document.createElement("div");
      msgDiv.classList.add("message", sender);
      msgDiv.textContent = text;
      chatWindow.appendChild(msgDiv);
      chatWindow.scrollTop = chatWindow.scrollHeight;
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
        const response = await fetch("http://localhost:5000/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text })
        });
        const data = await response.json();
        // Display the bot's reply
        addMessage(data.reply, "bot");
      } catch (error) {
        console.error("Error:", error);
        addMessage("Oops! Something went wrong. Please try again.", "bot");
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
  