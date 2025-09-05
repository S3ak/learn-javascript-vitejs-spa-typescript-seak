const WS_PORT = 8080;
const WS_URL = `ws://localhost:${WS_PORT}`;
const socket = new WebSocket(WS_URL);

// Connection opened
socket.addEventListener("open", (_event) => {
  console.log("Connected to WebSocket server!");
  // Send a message to the server
  socket.send("Hello Server, this is the client!");
});

// Listen for messages from the server
socket.addEventListener("message", (event) => {
  console.log("Message from server: ", event.data);
});

// Listen for connection close
socket.addEventListener("close", (_event) => {
  console.log("Disconnected from WebSocket server.");
});

// Listen for errors
socket.addEventListener("error", (error) => {
  console.error("WebSocket Error: ", error);
});
