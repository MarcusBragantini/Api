import Travel from "../../models/Travel.js";
import Vehicle from "../../models/Vehicle.js";
import Driver from "../../models/Driver.js";

export const createTravels = async (req, res) => {
    console.log('Dados recebidos:', req.body);
    const { dateInitial, origin, destination, dateFinal, vehicleId, driverId , initialKm, finalKm} = req.body;
    try {
        const travel = await Travel.create({ dateInitial, origin, destination, dateFinal, vehicleId, driverId , initialKm, finalKm });
        res.status(201).json(travel);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar Viagem', details: error.message });
    }
};

export const getTravels = async (req, res) => {
    try {
        const travels = await Travel.findAll({
            include: [
                { model: Vehicle, attributes: ['model', 'plate'] },
                { model: Driver, attributes: ['name', 'document'] }
            ]
        });
        res.status(200).json(travels);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar Viagens', details: error.message });
    }
};

export const updateTravels = async (req, res) => {
    const { id } = req.params;
    const { dateInitial, origin, destination, dateFinal, vehicleId, driverId , initialKm, finalKm } = req.body;
    try {
        const [updated] = await Travel.update({ dateInitial, origin, destination, dateFinal, vehicleId, driverId , initialKm, finalKm }, { where: { id } });
        if (updated) {
            const updatedTravel = await Travel.findOne({ where: { id } });
            res.status(200).json({ message: 'Viagem atualizada com sucesso', travel: updatedTravel });
        } else {
            res.status(404).json({ error: 'Viagem não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar Viagem', details: error.message });
    }
};

export const deleteTravels = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Travel.destroy({ where: { id } });
        if (deleted) {
            res.status(200).json({ message: 'Viagem deletada com sucesso' });
        } else {
            res.status(404).json({ error: 'Viagem não encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar Viagem', details: error.message });
    }
};
