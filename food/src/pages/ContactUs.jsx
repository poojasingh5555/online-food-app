import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function ContactUs({ userId }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    // Join room as client
    socket.emit("joinRoom", { userId, role: "client" });

    // Listen for incoming messages
    socket.on("receiveMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [userId]);

  const sendMessage = () => {
    if (message.trim()) {
      // Send to admin (assume adminId is known, e.g., "admin1")
      socket.emit("sendMessage", { senderId: userId, receiverId: "admin1", text: message });
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Live Chat with Support</h2>
      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto" }}>
        {chat.map((msg, i) => (
          <div key={i}>
            <strong>{msg.senderId === userId ? "You" : "Admin"}:</strong> {msg.text} <small>({msg.time})</small>
          </div>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
