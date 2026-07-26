import { useEffect } from "react";
import io from "socket.io-client";

export default function App() {
  useEffect(() => {
    const socket = io("http://localhost");

    socket.emit("message", "Hello my name is Client.");

    socket.on("message", (message) => {
      console.log(message);
    });

    // Nettoyage à la destruction du composant
    return () => {
      socket.disconnect();
    };
  }, []);

  return null; // ou ton JSX habituel
}