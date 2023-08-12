const { Sequelize, Op } = require('sequelize')
const Controller = require('../controllers/Controller')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const authService = require('../services/AuthService')
const userInit = require("../models/User");
const roleInit = require("../models/Role");
const dayInit = require("../models/Day");
const companyInit = require("../models/Company");
const {dbInit} = require("../services/BDService");
const { roleNames, paths } = require('../config')
const date = require('date-and-time')
const reportService = require("../services/ReportService")
const url = require('url')

class reportController extends Controller {
    constructor() {
        super()

        userInit.then(User => this.User = User)
        dayInit.then(Day => this.Day = Day)
        companyInit.then(Company => this.Company = Company)
    }

    generateReport = async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(200).json({ result: false, message: 'Report generating error', errors: errors })
        }

        const sequelize = await dbInit
        const User = this.User
        const Day = this.Day
        const Company = this.Company

        try {
            const { authUser } = req
            const { months, user_id } = req.body

            const companies = await Company.findAll({ attributes: ['id', 'name', 'cif', 'code', 'law_text'] })
            let days = await Day.findAll({
                raw: true,
                attributes: ['id', 'date'],
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), { [Op.in]: months }),
                        {
                            user_id: user_id,
                        }
                    ]
                },
            })

            if (!companies.length) {
                return res.status(200).json({ result: false, message: 'Company is empty', errors: errors })
            }

            const fileName = await reportService.generateReport(days, companies[0], authUser, months)

            const fileFullUrl = paths.reportDirUrl + fileName

            return res.json({ result: true, fileUrl: fileFullUrl })

        } catch (e) {
            this.error(res, e)
        }
    }
}

module.exports = new reportController()