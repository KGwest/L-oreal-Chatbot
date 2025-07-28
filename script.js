import "./prompt.js";

window.addEventListener("DOMContentLoaded", () => {
  const chatForm = document.getElementById("chatForm");
  const userInput = document.getElementById("userInput");
  const chatWindow = document.getElementById("chatWindow");

  let messages = [window.systemPrompt];

  chatWindow.textContent = "👋 Hello! How can I help you today?";

  function appendMessage(role, text) {
    const msg = document.createElement("div");
    msg.className = `msg ${role}`;
    msg.innerHTML = markdownToHTML(text);
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  function markdownToHTML(mdText) {
    return mdText
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(
        /\[(.*?)\]\((.*?)\)/g,
        '<a href="$2" target="_blank" rel="noopener">$1</a>'
      )
      .replace(/\n/g, "<br>");
  }

  async function getAIResponse(userMessage) {
    messages.push({ role: "user", content: userMessage });

    const loadingMsg = document.createElement("div");
    loadingMsg.className = "msg ai thinking";

    for (let i = 0; i < 3; i++) {
      const dot = document.createElement("div");
      dot.className = "dot";
      loadingMsg.appendChild(dot);
    }

    chatWindow.appendChild(loadingMsg);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
      const response = await fetch(
        "https://sweet-credit-1696.kezia-west.workers.dev",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages }),
        }
      );

      const data = await response.json();
      let aiReply = data.reply || "";

      const fallback = `🤔 Hmm… that’s outside my area of glam!  
If you need help with beauty routines, product picks, or finding your perfect shade, I’m here for you 💄✨`;

      const invalid =
        !aiReply ||
        aiReply.toLowerCase().includes("sorry") ||
        aiReply.length < 20;

      if (invalid) aiReply = fallback;

      messages.push({ role: "assistant", content: aiReply });

      chatWindow.removeChild(loadingMsg);
      return aiReply;
    } catch (err) {
      console.error("Worker fetch failed:", err);
      chatWindow.removeChild(loadingMsg);
      return "😓 Something went wrong. Please try again!";
    }
  }

  chatForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const userText = userInput.value.trim();
    if (!userText) return;

    appendMessage("user", userText);
    userInput.value = "";

    const botResponse = await getAIResponse(userText);
    appendMessage("ai", botResponse);
  });
});

// INTRO ANIMATION (keep outside DOMContentLoaded)
window.addEventListener("load", () => {
  const overlay = document.getElementById("introOverlay");
  const circles = document.querySelectorAll(".circle-art circle");
  const tagline = document.querySelector(".tagline");
  const taglineLetters = document.querySelectorAll(".tagline span");

  // Step 1: Animate circles fading out
  setTimeout(() => {
    [...circles].reverse().forEach((circle, i) => {
      setTimeout(() => circle.classList.add("fade-out"), i * 200);
    });
  }, 4500);

  // Step 2: Animate tagline letter-by-letter fade in
  setTimeout(() => {
    if (tagline) tagline.style.opacity = "1"; // ensure it's visible
    taglineLetters.forEach((letter) => {
      const randomDelay = Math.floor(Math.random() * 800);
      setTimeout(() => letter.classList.add("fade-in"), randomDelay);
    });
  }, 5500);

  // Step 3: Add fade-out transition to the tagline
  setTimeout(() => {
    if (tagline) {
      tagline.style.transition = "opacity 1s ease";
      tagline.style.opacity = "0"; // fades it out smoothly
    }
  }, 8500); // begin fading out before overlay ends

  // Step 4: Fully hide tagline from layout after fade completes
  setTimeout(() => {
    if (tagline) {
      tagline.style.display = "none"; // removes space it occupied
    }
  }, 9500);

  // Step 5: Fade out the entire overlay
  setTimeout(() => {
    overlay.style.opacity = "0";
    overlay.style.pointerEvents = "none";
    overlay.style.zIndex = "-9999";
    setTimeout(() => overlay.remove(), 1500);
  }, 10000);
});
