import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('u950457610_veiculos','u950457610_becape',"Mvb081521", {
    host: '149.62.37.1',
    dialect: 'mysql',
    logging: false, // Desativa logs de SQL no console
    define: {
        timestamps: false // Desativa timestamps automáticos
    }
});

export default sequelize;
