import { io } from "socket.io-client";
import { renderMessage } from "../chat/chat";

const WS_PORT = 8080;
const WS_URL = `http://localhost:${WS_PORT}`;

// Connect to the Socket.io server
const socket = io(WS_URL);

// Listen for the built-in 'connect' event
socket.on("connect", () => {
  console.log("Successfully connected to server with ID:", socket.id);
});

// Listen for the built-in 'disconnect' event
socket.on("disconnect", () => {
  console.log("Disconnected from server.");
});

socket.on("chat message", (message) => {
  renderMessage(message);
});

export default socket;
