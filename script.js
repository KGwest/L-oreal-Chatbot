/* DOM elements */
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const chatWindow = document.getElementById("chatWindow");

// Set initial message
chatWindow.textContent = "👋 Hello! How can I help you today?";

/* Handle form submit */
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // When using Cloudflare, you'll need to POST a `messages` array in the body,
  // and handle the response using: data.choices[0].message.content

  // Show message
  chatWindow.innerHTML = "Connect to the OpenAI API for a response!";
});

window.addEventListener("load", () => {
  const overlay = document.getElementById("introOverlay");
  const circles = document.querySelectorAll(".circle-art circle");
  const taglineLetters = document.querySelectorAll(".tagline span");

  // Fade out circles
  setTimeout(() => {
    [...circles].reverse().forEach((circle, i) => {
      setTimeout(() => {
        circle.classList.add("fade-out");
      }, i * 200);
    });
  }, 4500);

  // ✨ RANDOMIZED LETTER FADE-IN ✨
  setTimeout(() => {
    taglineLetters.forEach((letter) => {
      const randomDelay = Math.floor(Math.random() * 1000); // Up to 1s delay
      setTimeout(() => {
        letter.classList.add("fade-in");
      }, randomDelay);
    });
  }, 5500);

  // Fade out overlay
  setTimeout(() => {
    if (overlay) {
      overlay.style.opacity = "0";
      setTimeout(() => overlay.remove(), 1500);
    }
  }, 10000);
});




setTimeout(() => {
  taglineLetters.forEach((letter, i) => {
    setTimeout(() => {
      letter.classList.add("fade-in");
    }, i * 80);
  });
}, 5500);
