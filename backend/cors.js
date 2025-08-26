import cors from "cors";

const allowedOrigins = [
  "http://localhost:3000",
  "https://hey-chat-nine.vercel.app/login"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export default cors(corsOptions);
