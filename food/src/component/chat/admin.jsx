import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function admin({ adminId }) {
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedUser, setSelectedUser] = useState(""); // userId of client

  useEffect(() => {
    // Join room as admin
    socket.emit("joinRoom", { userId: adminId, role: "admin" });

    socket.on("receiveMessage", (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, [adminId]);

  const sendMessage = () => {
    if (message.trim() && selectedUser) {
      socket.emit("sendMessage", { senderId: adminId, receiverId: selectedUser, text: message });
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Admin Chat</h2>
      <input placeholder="Client ID to chat" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} />
      <div style={{ border: "1px solid #ccc", height: "300px", overflowY: "auto" }}>
        {chat.map((msg, i) => (
          <div key={i}>
            <strong>{msg.senderId === adminId ? "You" : msg.senderId}:</strong> {msg.text} <small>({msg.time})</small>
          </div>
        ))}
      </div>
      <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type message..." />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
