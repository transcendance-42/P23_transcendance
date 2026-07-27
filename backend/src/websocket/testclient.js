// test-client.js
const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("✅ Connecté, id:", socket.id);
  socket.emit("message", "Hello depuis le script de test");
});

socket.on("message", (msg) => {
  console.log("📩 Message reçu du serveur:", msg);
});

socket.on("connect_error", (err) => {
  console.error("❌ Erreur de connexion:", err.message);
});

socket.on("disconnect", (reason) => {
  console.log("🔌 Déconnecté:", reason);
});