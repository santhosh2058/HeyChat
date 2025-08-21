import express from 'express'
import { connectDB } from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import uploadRoutes from './routes/upload.routes.js';
import dotenv from 'dotenv';
import cors from './cors.js';
dotenv.config();

const app = express()
const PORT=process.env.PORT||5000;

/*database connetion */
connectDB();

app.use(cors)
app.use(express.json());
app.use("/api/upload", uploadRoutes);
app.use('/api/auth',authRoutes)
//app.use('/api/chat',chatRoutes)
app.get('/', (req, res) => {
  res.status(200).json({ message: 'OK' });
});

const server = app.listen(PORT, () => {
    console.log(`listening at port ${PORT}`);
});
export { app, server };