const { DataTypes } = require('sequelize');
const { dbInit } = require('../services/BDService')

const companyInit = async () => {
    const sequelize = await dbInit
    return sequelize.define('Company', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        cif: { type: DataTypes.STRING, allowNull: false },
        code: [{ type: DataTypes.STRING, allowNull: false }],
        law_text: { type: DataTypes.TEXT, allowNull: true }
    }, {
        timestamps: false
    })
}

module.exports = companyInit()