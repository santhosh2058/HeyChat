// src/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URL; // backend URL
export const socket = io(SOCKET_URL, {
  autoConnect: false, // prevents auto connection, connect manually
});