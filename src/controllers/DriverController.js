import Driver from '../../models/Driver.js';
import bcrypt from 'bcrypt';


export const createDriver = async (req, res) => {
    const { name, age, document, gender, password } = req.body;
    try {
        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);
        const driver = await Driver.create({ name, age, document, gender, password: hashedPassword });
        res.status(201).json(driver);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar motorista', details: error.message });
    }
};

export const getDrivers = async (req, res) => {
    try {
        const drivers = await Driver.findAll();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar motoristas' });
    }
};

export const updateDriver = async (req, res) => {
    const { id } = req.params;
    const { name, age, document, gender,password } = req.body;
    try {
        await Driver.update({ name, age, document, gender , password}, { where: { id } });
        res.status(200).json({ message: 'Motorista atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar motorista' });
    }
};

export const deleteDriver = async (req, res) => {
    const { id } = req.params;
    try {
        await Driver.destroy({ where: { id } });
        res.status(200).json({ message: 'Motorista deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar motorista' });
    }
};
