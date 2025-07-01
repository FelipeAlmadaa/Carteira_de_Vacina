import app from './app.js';
import { sequelize } from './config/db.js';
import './models/User.js';
import './models/Vaccine.js';
import './models/UserVaccine.js';
import './models/associations.js';

const PORT = process.env.PORT || 3000;

try {
  await sequelize.authenticate();
  await sequelize.sync();
  console.log('🎉 Banco conectado');

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });

} catch (error) {
  console.error('❌ Erro ao iniciar servidor:', error);
}
