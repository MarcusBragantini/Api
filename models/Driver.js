import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Driver = sequelize.define('driver', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    document: {
        type: DataTypes.STRING,
        allowNull: false
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
    }, {
        freezeTableName: true,
    });

export default Driver;
