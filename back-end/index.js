import app from './app.js';

// Aqui você pode conectar o banco se quiser garantir que foi autenticado
import { sequelize } from './config/db.js';

try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('🎉 Banco conectado');
} catch (error) {
  console.error('Erro ao conectar com banco:', error);
}

export default app;
