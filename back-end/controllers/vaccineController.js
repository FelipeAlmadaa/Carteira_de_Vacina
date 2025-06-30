// controllers/vaccineController.js
import { User } from '../models/User.js';
import { Vaccine } from '../models/Vaccine.js';

export const registerVaccines = async (req, res) => {
  try {
    const userId = req.user.id; 
    const { vacinas } = req.body; // Array de códigos das vacinas, ex: ['triplice20', 'dtpa18']

    if (!vacinas || !Array.isArray(vacinas) || vacinas.length === 0) {
      return res.status(400).json({ error: 'Nenhuma vacina fornecida.' });
    }

    // Busca as vacinas no banco que correspondem aos códigos enviados
    const vaccinesFound = await Vaccine.findAll({
      where: { codigo: vacinas }
    });

    if (vaccinesFound.length === 0) {
      return res.status(404).json({ error: 'Nenhuma vacina válida encontrada.' });
    }

    // Busca o usuário no banco (para garantir que existe)
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    // Adiciona as vacinas ao usuário
    // Usando "addVaccines" gerado pelo belongsToMany (plural: addVaccines)
    // Poderia usar também setVaccines para substituir, ou addVaccine para uma só
    for (const vaccine of vaccinesFound) {
      await user.addVaccine(vaccine, { through: { aplicada: true } });
    }

    return res.json({ message: 'Vacinas registradas com sucesso!' });
  } catch (error) {
    console.error('Erro ao registrar vacinas:', error);
    return res.status(500).json({ error: 'Erro interno no servidor.' });
  }
};

export const getUserVaccines = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      include: {
        model: Vaccine,
        through: {
          attributes: ['aplicada', 'dataAplicacao']
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    const vacinas = user.Vaccines.map(v => ({
      nome: v.nome,
      descricao: v.descricao,
      aplicada: v.UserVaccine.aplicada,
      dataAplicacao: v.UserVaccine.dataAplicacao
    }));

    return res.json(vacinas);
  } catch (error) {
    console.error('Erro ao buscar vacinas do usuário:', error);
    return res.status(500).json({ error: 'Erro ao buscar vacinas.' });
  }
};