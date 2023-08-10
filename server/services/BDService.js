require('dotenv').config()
const { Sequelize } = require('sequelize')

class BDService {
    static async databaseInit () {
        console.log('databaseInit')
        const sequelize = new Sequelize(process.env.DATABASE, process.env.LOGIN, process.env.PASSWORD, {
            host: process.env.HOST,
            dialect: 'mysql'
        });
        await sequelize.authenticate()
        return sequelize
    }
}

module.exports = { dbInit: BDService.databaseInit() }