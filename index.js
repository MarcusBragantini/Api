import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import sequelize from './config/database.js';
import Driver from './models/Driver.js';
import Travel from './models/Travel.js';
import Vehicle from './models/Vehicle.js'; 

const app = express();
app.use(cors());
app.use(express.json());


// Verifica a conexão com o banco de dados
sequelize.authenticate()
    .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
    .catch(err => console.error('Não foi possível conectar ao banco de dados:', err));

// Rota de Login
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const driver = await Driver.findOne({ where: { name: username } });
        if (driver && await bcrypt.compare(password, driver.password)) {
            res.status(200).json({ message: 'Login bem-sucedido', driverId: driver.id });
        } else {
            res.status(401).json({ message: 'Nome de usuário ou senha incorretos' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar login', details: error.message });
    }
});

// Rota de Criar viagens
app.post('/api/travels', async (req, res) => {
    const { dateInitial, origin, destination, dateFinal, vehicleId, driverId , initialKm,finalKm } = req.body;
    try {
        const travel = await Travel.create({ dateInitial, origin, destination, dateFinal, vehicleId, driverId, initialKm, finalKm});
        //console.log(travel);
        res.status(201).json(travel);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar Viagem', details: error.message });
    }
});

// Rota de Criar Motoristas
app.post('/api/drivers', async (req, res) => {
    const { name, age, document, gender, password } = req.body;
    try {
        const driver = await Driver.create({ name, age, document, gender, password});
        res.status(201).json(driver);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar Motorista', details: error.message });
    }
});

// Rota para atualizar viagens
app.put('/api/travels/:id', async (req, res) => {
    try {
        const { id } = req.params;  // Corrigido para usar 'id' ao invés de 'travelId'
        const { finalKm, dateFinal } = req.body;

        console.log('Recebendo dados:', { id, finalKm, dateFinal });

        const travelUpdate = await Travel.findByPk(id);  // Busca a viagem pelo ID correto

        if (!travelUpdate) {
            return res.status(404).json({ error: 'Viagem não encontrada' });
        }

        console.log('Atualizando viagem com:', { finalKm, dateFinal });
        
        // Atualiza os campos finalKm e dateFinal da viagem
        travelUpdate.finalKm = finalKm;
        travelUpdate.dateFinal = dateFinal;
        await travelUpdate.save();

        res.json({ message: 'Viagem atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar viagem:', error);
        res.status(500).json({ error: 'Erro ao atualizar viagem' });
    }
});

// Rota para Buscar Veiculos
app.get('/api/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Veículos', details: error.message });
    }
});

// Rota para Buscar Motoristas
app.get('/api/drivers', async (req, res) => {
    try {
        const drivers = await Driver.findAll();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Veículos', details: error.message });
    }
});


// Rota para Buscar Viagens
app.get('/api/travels', async (req, res) => {
    try {
        const travels = await Travel.findAll({
            include: [
                {
                    model: Driver,
                    attributes: ['name']
                },
                {
                    model: Vehicle,
                    attributes: ['model']
                }
            ]
        });
        console.log(JSON.stringify(travels, null, 2)); // Verifique o conteúdo retornado
        res.status(200).json(travels);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Viagens', details: error.message });
    }
});

// Rota para atualizar motorista
app.patch('/api/drivers/:id', async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    
    try {
        if (!password) {
            return res.status(400).json({ error: 'Senha nova é obrigatória' });
        }

        const driver = await Driver.findByPk(id);

        if (!driver) {
            return res.status(404).json({ error: 'Motorista não encontrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        driver.password = hashedPassword;
        await driver.save();

        res.status(200).json({ message: 'Senha atualizada com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar senha:', error);
        res.status(500).json({ error: 'Erro ao atualizar senha' });
    }
});






const PORT = 3000;
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`);
    });
}).catch(err => console.log('Erro ao sincronizar com o banco de dados:', err));
