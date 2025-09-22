const express = require("express");

const http = require('http');
const {Server} = require("socket.io");
const cors = require("cors");


const app = express();
const port = 5000;

const connectDb = require("./db.js");
const router = require("./routes/routing.js");
const orderroute =  require("./routes/orderme.js");

//crete http server
const server = http.createServer(app);
//attach socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"],
  },
});
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api", router);
app.use("/rest", orderroute);
//connection
connectDb();

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

  // Private message between client and admin
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const message = {
      senderId,
      receiverId,
      text,
      time: new Date().toLocaleTimeString(),
    };

    // Send to receiver if online
    const receiverSocketId = onlineUsers[receiverId];
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("receiveMessage", message);
    }

    // Send back to sender for immediate display
    socket.emit("receiveMessage", message);
  });

  // Disconnect
  socket.on("disconnect", () => {
    if (socket.userId) delete onlineUsers[socket.userId];
    console.log("User disconnected:", socket.id);
  });
});


server.listen(port, () => {
  console.log(`server connected on ${port}`);
});
