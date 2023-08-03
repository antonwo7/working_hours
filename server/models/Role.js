const { Sequelize, DataTypes } = require('sequelize');
const BDService = require('../services/BDService')

const roleInit = async () => {
    const sequelize = await BDService.databaseInit()

    return sequelize.define('Role', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, defaultValue: 'USER', allowNull: false, unique: true }
    }, {
        timestamps: false
    });
}

module.exports = roleInit