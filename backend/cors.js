// backend/cors.js (optional helper)
import cors from 'cors';

const allowed = [
  'http://localhost:5173',            // Vite dev
  'https://<your-frontend>.vercel.app'
];

export default cors({
  origin: (origin, cb) => {
    if (!origin || allowed.includes(origin)) return cb(null, true);
    return cb(new Error('Not allowed by CORS'));
  },
  credentials: true
});
