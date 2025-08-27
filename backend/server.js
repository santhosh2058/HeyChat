import express from 'express'
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import chatRoutes from './routes/chat.routes.js';
import messageRoutes from './routes/message.routes.js';
import { createServer } from 'http';
import { Server } from 'socket.io';
dotenv.config();

const app = express()
const PORT=process.env.PORT||5000;

/*database connetion */
connectDB();

const allowedOrigins = [
  "http://localhost:3000",
  "https://hey-chat-nine.vercel.app"
];
/* Apply CORS globally */
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies/auth headers
}));

app.use(express.json());
app.use("/api/upload", uploadRoutes);
app.use('/api/auth',authRoutes)
app.use('/api/user',userRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message',messageRoutes)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' });
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
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join a chat room
  socket.on("join_chat", (chatId) => {
    socket.join(chatId);
    console.log(`Socket ${socket.id} joined chat ${chatId}`);
  });

  // Listen for messages
  socket.on("send_message", (message) => {
    // Broadcast to all users in the room except sender
    
    socket.to(message.chatId).emit("receive_message", message);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export { app, server, io };