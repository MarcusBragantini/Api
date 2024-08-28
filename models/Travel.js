import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Vehicle from './Vehicle.js';
import Driver from './Driver.js';

const Travel = sequelize.define('Travel', {
    dateInitial: {
        type: DataTypes.DATE,
        allowNull: false
    },
    origin: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dateFinal: {
        type: DataTypes.DATE,
        allowNull: true
    },
    vehicleId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    driverId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    initialKm: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    finalKm: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    freezeTableName: true
});

// Definindo as associações
// Modelo Travel
Travel.belongsTo(Vehicle, { foreignKey: 'vehicleId', targetKey: "id" });
Travel.belongsTo(Driver, { foreignKey: 'driverId', targetKey: "id" });

Vehicle.hasMany(Travel, { foreignKey: 'vehicleId', sourceKey: "id" });
Driver.hasMany(Travel, { foreignKey: 'driverId', sourceKey: "id" });


Travel.findAll({
    include: [
        {
            model: 'Vehicle',
            attributes: ['model']
        },
        {
            model: 'Driver',
            attributes: ['name']
        }
    ]
}).then(travels => {
    console.log(travels)
}).catch(error => {
    console.log(error)
});

export default Travel;
