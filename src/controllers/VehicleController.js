import Vehicle from '../../models/Vehicle.js';

export const createVehicles = async (req, res) => {
    const { model, plate, year, color, status, km } = req.body;
    try {
        const vehicle = await Vehicle.create({ model, plate, year, color, status, km });
        res.status(201).json(vehicle);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar Veículo', details: error.message });
    }
};

export const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar Veículos', details: error.message });
    }
};

export const updateVehicles = async (req, res) => {
    const { id } = req.params;
    const { model, plate, year, color, status, km } = req.body;
    try {
        const [updated] = await Vehicle.update({ model, plate, year, color, status, km }, { where: { id } });
        if (updated) {
            const updatedVehicle = await Vehicle.findOne({ where: { id } });
            res.status(200).json({ message: 'Veículo atualizado com sucesso', vehicle: updatedVehicle });
        } else {
            res.status(404).json({ error: 'Veículo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar Veículo', details: error.message });
    }
};

export const deleteVehicles = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Vehicle.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: 'Veículo deletado com sucesso' });
        } else {
            res.status(404).json({ error: 'Veículo não encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar Veículo', details: error.message });
    }
};
