// client/src/App.jsx
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000')

export default function BasicChat() {
  const [messages, setMessages] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });
    return () => socket.off('receive_message');
  }, []);

  const sendMessage = () => {
    if (msg.trim()) {
      socket.emit('send_message', { text: msg });
      setMsg('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((m, i) => <p key={i}><b>{m.user}:</b> {m.text}</p>)}
      </div>
      <input value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}