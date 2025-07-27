const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// Set initial message
chatWindow.textContent = "👋 Hello! How can I help you today?";

/* Intro overlay animation */
window.addEventListener("load", () => {
  const overlay = document.getElementById("introOverlay");
  const circles = document.querySelectorAll(".circle-art circle");
  const taglineLetters = document.querySelectorAll(".tagline span");

  setTimeout(() => {
    [...circles].reverse().forEach((circle, i) => {
      setTimeout(() => circle.classList.add("fade-out"), i * 200);
    });
  }, 4500);

  setTimeout(() => {
    taglineLetters.forEach((letter) => {
      const randomDelay = Math.floor(Math.random() * 1000);
      setTimeout(() => letter.classList.add("fade-in"), randomDelay);
    });
  }, 5500);

  setTimeout(() => {
    if (overlay) {
      overlay.style.opacity = "0";
      setTimeout(() => overlay.remove(), 1500);
    }
  }, 10000);
});

window.addEventListener("load", () => {
  const overlay = document.getElementById("introOverlay");

  // Only show animation if user hasn't seen it before
  const hasSeenIntro = localStorage.getItem("hasSeenIntro");
  if (hasSeenIntro === "true") {
    overlay.remove(); // or just hide it
    return;
  }

  // 🌀 Run animation
  const circles = document.querySelectorAll(".circle-art circle");
  const taglineLetters = document.querySelectorAll(".tagline span");

  setTimeout(() => {
    [...circles].reverse().forEach((circle, i) => {
      setTimeout(() => circle.classList.add("fade-out"), i * 200);
    });
  }, 4500);

  setTimeout(() => {
    taglineLetters.forEach((letter) => {
      const randomDelay = Math.floor(Math.random() * 1000);
      setTimeout(() => letter.classList.add("fade-in"), randomDelay);
    });
  }, 5500);

  setTimeout(() => {
    overlay.style.opacity = "0";
    setTimeout(() => overlay.remove(), 1500);
  }, 10000);

  localStorage.setItem("hasSeenIntro", "true");
});


// 👇 CHAT FUNCTIONALITY
chatForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  const userText = userInput.value.trim();
  if (!userText) return;

  appendMessage("user", userText);
  userInput.value = "";

  const botResponse = await getAIResponse(userText);
  appendMessage("ai", botResponse);
});

function appendMessage(role, text) {
  const msg = document.createElement("div");
  msg.className = `msg ${role}`;
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

async function getAIResponse(userMessage) {
  const endpoint = "https://sweet-credit-1696.kezia-west.workers.dev"; // ✅ Your Worker URL

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ message: userMessage }),
      headers: { "Content-Type": "application/json" }
    });

    const data = await response.json();
    return data.reply || "🤖 Sorry, I didn’t get that.";
  } catch (err) {
    console.error("Worker fetch failed:", err);
    return "🚨 There was a problem connecting to the chatbot.";
  }
}

let messages = [
  {
    role: "system",
    content: "You are a helpful beauty consultant for L’Oréal. Only answer questions about L’Oréal products, skincare, makeup, haircare, fragrances, and beauty routines. Kindly refuse off-topic requests."
  }
];

async function getAIResponse(userMessage) {
  messages.push({ role: "user", content: userMessage });

  const response = await fetch("https://sweet-credit-1696.kezia-west.workers.dev", {
    method: "POST",
    body: JSON.stringify({ messages }),
    headers: { "Content-Type": "application/json" }
  });

  const data = await response.json();
  const aiReply = data.reply;
  messages.push({ role: "assistant", content: aiReply });

  return aiReply;
}
