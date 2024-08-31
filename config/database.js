import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'gerenciador_veiculos', // Nome do banco de dados
    'root',                 // Usuário do banco de dados
    'Bragantini',           // Senha do banco de dados
    {
        host: 'localhost',  // Endereço do servidor de banco de dados
        dialect: 'mysql',   // Dialeto a ser usado
        logging: false, 
        define: {
            timestamps: false
        }
    }
);

export default sequelize;
