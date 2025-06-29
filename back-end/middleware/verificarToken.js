import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const verificarToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado' });

    req.user = { id: user.id, nome: user.nome };
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};
