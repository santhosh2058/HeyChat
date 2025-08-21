import express from 'express';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

app.use('/protected',authenticate);

export default router;