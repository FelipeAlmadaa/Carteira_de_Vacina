import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import vaccineRoutes from './routes/vaccineRoutes.js';
import { sequelize } from './config/db.js';
import './models/User.js';
import './models/Vaccine.js';
import './models/UserVaccine.js';
import './models/associations.js';

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', vaccineRoutes);

// Remove o listen(), pois a Vercel que vai cuidar disso

export default app;
