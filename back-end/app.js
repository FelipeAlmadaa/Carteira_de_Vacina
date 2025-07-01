// back-end/app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import vaccineRoutes from './routes/vaccineRoutes.js';

// Não precisamos importar sequelize, User, Vaccine, UserVaccine, associations aqui
// porque a conexão e sincronização do banco de dados será feita no index.js
// e os modelos serão importados lá para garantir que estejam carregados antes da sincronização.

dotenv.config();

const app = express();

// ✅ Configurar CORS e JSON
app.use(cors({
  // Em produção no Vercel, você pode precisar ajustar isso para a URL do seu frontend
  // ou para '*' se for uma API pública e você gerenciar o CORS de outra forma.
  // Para desenvolvimento local, 'http://127.0.0.1:5500' está ok.
  origin: 'http://127.0.0.1:5500',
  credentials: true
}));
app.use(express.json());

// ✅ Registrar rotas DEPOIS do app ser criado
app.use('/api', authRoutes);
app.use('/api', vaccineRoutes);

// REMOVIDO: A função startServer() e app.listen() foram removidas daqui.
// O servidor será iniciado pelo ambiente serverless do Vercel,
// que espera que a instância 'app' seja exportada.

export default app; // Exporta a instância do aplicativo Express
