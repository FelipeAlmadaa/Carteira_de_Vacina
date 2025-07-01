import app from './app.js';

import { sequelize } from './config/db.js';



try {
await sequelize.authenticate();
await sequelize.sync();
console.log('🎉 Banco conectado');

} catch (error) {

console.error('Erro ao conectar com banco:', error);

}



export default app;