import express from "express";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import connectDb from "./db.js";
import router from "./routes/routing.js";
import orderroute from "./routes/orderme.js";

const app = express();
const port = 5000;
const __dirname = path.resolve(); // Node.js doesn't provide __dirname in ES modules, so we define it

// Create HTTP server
const server = http.createServer(app);

// Attach socket.io
const io = new Server(server, {
  cors: {
    origin: "https://online-food-app-csne.onrender.com",
    methods: ["GET", "POST"],
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", router);
app.use("/rest", orderroute);

// Connect DB
connectDb();



// Socket.io
const onlineUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // User or admin joins
  socket.on("joinRoom", ({ userId, role }) => {
    onlineUsers[userId] = socket.id;
    socket.userId = userId;
    socket.role = role;
    console.log(`${role} joined: ${userId}`);
  });

  // Private message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const message = {
      senderId,
      receiverId,
      text,
      time: new Date().toLocaleTimeString(),
    };

    const receiverSocketId = onlineUsers[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", message);
    }

    socket.emit("receiveMessage", message);
  });

  // Disconnect
  socket.on("disconnect", () => {
    if (socket.userId) delete onlineUsers[socket.userId];
    console.log("User disconnected:", socket.id);
  });
});

// Start server
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
