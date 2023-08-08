const { DataTypes } = require('sequelize');
const BDService = require('../services/BDService')
const date = require('date-and-time')

const dayInit = async () => {
    const sequelize = await BDService.databaseInit()

    return sequelize.define('Day', {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            get: function(){
                return date.format(new Date(this.getDataValue('date')), 'DD-MM-YYYY')
            }
        },
        user_id: { type: DataTypes.INTEGER, allowNull: false }

    }, {
        timestamps: false
    });
}

module.exports = dayInit