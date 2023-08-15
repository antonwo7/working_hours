require('dotenv').config()
const { Sequelize } = require('sequelize')

class BDService {
    sequelize = null

    constructor() {
        console.log('BDService constructor')
        this.sequelize = new Sequelize(process.env.DATABASE, process.env.LOGIN, process.env.PASSWORD, {
            host: process.env.HOST,
            dialect: 'mysql'
        })
    }

    dbConnect = async () => {
        console.log('BDService dbConnect')
        if (!this.sequelize) return;
        await this.sequelize.authenticate()
    }

    dbClose = async () => {
        console.log('BDService dbClose')
        await this.sequelize.close()
    }
}

module.exports = new BDService()