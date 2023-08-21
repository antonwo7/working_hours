const { Sequelize, Op } = require('sequelize')
const Controller = require('../controllers/Controller')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const authService = require('../services/AuthService')
const User = require("../models/User")
const Role = require("../models/Role")
const Day = require("../models/Day")
const Company = require("../models/Company")
const {sequelize} = require("../services/BDService")
const { roleNames, paths } = require('../config')
const date = require('date-and-time')
const reportService = require("../services/ReportService")
const url = require('url')

class reportController extends Controller {
    generateReport = async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return this.unsuccess(res,{ message: 'Report generating error', errors: errors })
        }

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
                return this.unsuccess(res,{ message: 'Company is empty', errors: errors })
            }

            const fileName = await reportService.generateReport(days, companies[0], authUser, months)
            if (!fileName) {
                return this.unsuccess(res, {})
            }

            const fileFullUrl = paths.reportRouterDirUrl + fileName

            return this.success(res,{ fileUrl: fileFullUrl })

        } catch (e) {
            this.error(res, e)
        }
    }

    downloadReport = (req, res) => {
        const { filename } = req.params
        if (!filename) {
            return this.unsuccess(res, {message: 'File is empty'})
        }

        res.download(paths.report + filename)
    }
}

module.exports = new reportController()