import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('gerenciador_veiculos', 'root', 'Bragantini', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false, // Desativa logs de SQL no console
    define: {
        timestamps: false // Desativa timestamps automáticos
    }
});

export default sequelize;
