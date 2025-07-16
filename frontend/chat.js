document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const chatbox = document.getElementById("chatbox");
  const userInput = document.getElementById("userInput");
  const sendBtn = document.getElementById("sendBtn");

  const API_ENDPOINT = "https://babyllm.onrender.com/chat";

  let isSending = false;

  function appendMessage(sender, text, align = "left") {
    const message = document.createElement("div");
    message.className = `text-${align} text-sm whitespace-pre-wrap`;
    message.textContent = `${sender}: ${text}`;
    chatbox.appendChild(message);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  async function sendMessage() {
    if (isSending) return;
    isSending = true;

    const userText = userInput.value.trim();
    if (!userText) {
      isSending = false;
      return;
    }

    appendMessage("You", userText, "right");
    userInput.value = "";

    const loadingMsg = document.createElement("div");
    loadingMsg.className = "text-left text-gray-400 italic";
    loadingMsg.textContent = "Thursday is thinking...";
    chatbox.appendChild(loadingMsg);
    chatbox.scrollTop = chatbox.scrollHeight;

    try {
      const res = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText })
      });

      const data = await res.json();
      chatbox.removeChild(loadingMsg);

      const botName = data.bot_name || "Thursday";
      if (data.reply) {
        appendMessage(botName, data.reply, "left");
      } else {
        appendMessage(botName, "Sorry, I didn’t understand that.", "left");
      }
    } catch (err) {
      chatbox.removeChild(loadingMsg);
      appendMessage("Thursday", "Oops! Something went wrong.", "left");
      console.error(err);
    }

    isSending = false;
  }

  sendBtn.addEventListener("click", sendMessage);

  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });
});
