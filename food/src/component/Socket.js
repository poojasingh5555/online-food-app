// src/socket.js
import { io } from "socket.io-client";

const socket = io("https://online-food-app-csne.onrender.com"); // your backend URL

export default socket;
