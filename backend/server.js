import express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { verifyToken } from "./middleware/auth.middleware.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/*database connetion */
connectDB();

const allowedOrigins = [
  "http://localhost:3000",
  "https://hey-chat-nine.vercel.app",
];
/* Apply CORS globally */
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow cookies/auth headers
  })
);

app.use(express.json());
app.use("/api/upload", uploadRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "OK" });
});

/* Create HTTP server for Socket.IO */
const server = createServer(app);

/* Initialize Socket.IO */
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

/* Socket.IO events */
/* Socket.IO authentication middleware */
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("Authentication error"));

  verifyToken(token)
    .then((user) => {
      socket.user = user; // attach user to socket
      next();
    })
    .catch((err) => {
      console.error("Socket auth failed:", err.message);
      next(new Error("Authentication error"));
    });
});

io.on("connection", (socket) => {
  console.log("User connected");

  // Join personal room (userId based)
  socket.join(socket.user._id);

  // Join chat rooms (if needed later)
  socket.on("join_chat", (chatId) => {
    try {
      socket.join(chatId);
      console.log(`User joined chat ${chatId}`);
    } catch (err) {
      console.error("Join chat error:", err);
    }
  });

  // Leave chat
  socket.on("leave_chat", (chatId) => {
    socket.leave(chatId);
    console.log(`User left chat ${chatId}`);
  });

  // message is saved in db and sent to all users in chat handled in message.controller.js

  // Typing indicator
  socket.on("typing", (chatId) => {
    socket.to(chatId).emit("typing", socket.user._id);
  });

  socket.on("stop_typing", (chatId) => {
    socket.to(chatId).emit("stop_typing", socket.user._id);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:");
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export { app, server, io };
