import socket from "../../services/ws/ws";
// const messagesEl = window.document.getElementById("js-messages");

const chatFormEl = window.document.getElementById(
  "js-chat-form"
) as HTMLFormElement | null;

if (chatFormEl) {
  chatFormEl.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(chatFormEl);
    const currentMessage = formData.get("js-user-message-field");

    if (typeof currentMessage === "string") {
      socket.emit("chat message", currentMessage);
    }

    chatFormEl.reset();
  });
}

export function renderMessage(message: string) {
  const messageContainerEl = document.getElementById("js-messages");
  if (!messageContainerEl) return;

  // Create a new message div
  const messageEl = document.createElement("div");
  messageEl.className = "chat-message";
  messageEl.textContent = message;

  // Append the message to the container
  messageContainerEl.appendChild(messageEl);

  messageContainerEl.scrollTop = messageContainerEl.scrollHeight;
}
