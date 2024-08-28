import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import driverRoutes from './src/routes/driverRoutes.js';
import vehicleRoutes from './src/routes/vehicleRoutes.js';
import travelRoutes from './src/routes/travelRoutes.js';

const app = express();
app.use(cors());

app.use(express.json());


app.use('/api', driverRoutes);
app.use('/api', vehicleRoutes);
app.use('/api', travelRoutes);


// Verifica a conexão com o banco de dados
sequelize.authenticate()
    .then(() => console.log('Conexão com o banco de dados estabelecida com sucesso.'))
    .catch(err => console.error('Não foi possível conectar ao banco de dados:', err));

// Inicializa o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
