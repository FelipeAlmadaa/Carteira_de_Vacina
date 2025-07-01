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

const express = require('express')
const app = express()

// ✅ Configurar CORS e JSON
app.use(cors({
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));
app.use(express.json());

// ✅ Registrar rotas DEPOIS do app ser criado
app.use('/api', authRoutes);
app.use('/api', vaccineRoutes);

// Iniciar servidor
async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('🎉 Banco conectado');

    const port = process.env.PORT || 4000 
    app.listen(port, () => {
      console.log(`🚀 Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
  }
}

startServer();





