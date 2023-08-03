const { Sequelize, DataTypes } = require('sequelize');
const BDService = require('../services/BDService')

const userInit = async () => {
    const sequelize = await BDService.databaseInit()

    return sequelize.define('User', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        username: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        role: [{ type: DataTypes.INTEGER, ref: 'Role' }],
        name: { type: DataTypes.STRING, allowNull: false },
        nif: { type: DataTypes.STRING, allowNull: false },
        naf: { type: DataTypes.STRING, allowNull: false },
        contract_code: { type: DataTypes.STRING, allowNull: false },
    }, {
        timestamps: false
    });
}

module.exports = userInit