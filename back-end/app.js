import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import vaccineRoutes from './routes/vaccineRoutes.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: ['http://127.0.0.1:5500', 'https://carteira-de-vacina.vercel.app'],
  credentials: true
}));


app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', vaccineRoutes);

export default app;
