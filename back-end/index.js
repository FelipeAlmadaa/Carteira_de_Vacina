// back-end/index.js
import app from './app.js'; // Importa a instância do aplicativo Express configurada em app.js

// Importa a conexão do banco de dados e os modelos
import { sequelize } from './config/db.js';
import './models/User.js';
import './models/Vaccine.js';
import './models/UserVaccine.js';
import './models/associations.js';

// Conectar e sincronizar o banco de dados
// Esta lógica será executada quando a função serverless for "aquecida" ou inicializada.
async function connectDbAndSync() {
  try {
    await sequelize.authenticate();
    await sequelize.sync(); // Sincroniza os modelos com o banco de dados
    console.log('🎉 Banco conectado e modelos sincronizados');
  } catch (error) {
    console.error('Erro ao conectar ou sincronizar com banco:', error);
    // Em um ambiente de produção, você pode querer lançar o erro
    // ou ter um mecanismo de retry mais robusto.
    process.exit(1); // Sai do processo se a conexão falhar
  }
}

// Chama a função de conexão e sincronização.
// É importante que isso seja feito antes que o 'app' seja exportado e usado pelo Vercel.
connectDbAndSync();

// Exporta a instância do aplicativo Express.
// O Vercel usa essa exportação para lidar com as requisições HTTP.
export default app;
