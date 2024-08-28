import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Vehicle = sequelize.define('Vehicle', {
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    plate: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'Livre'
    },
    km: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
    }, {
        freezeTableName: true
});

export default Vehicle;
