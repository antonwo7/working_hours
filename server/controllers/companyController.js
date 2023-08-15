const Controller = require('../controllers/Controller')
require('dotenv').config()
const {validationResult} = require('express-validator')
const Company = require("../models/Company")


class CompanyController extends Controller {
    getCompanies = async (req, res) => {
        try {
            const { token } = req.body
            if (!token) {
                return this.success(res,{ message: 'Empty token' })
            }

            const companies = await Company.findAll({ attributes: ['id', 'name', 'cif', 'code', 'law_text'] })
            return this.success(res,{ companies })

        } catch (e) {
            this.error(res, e)
        }
    }

    editCompany = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return this.unsuccess(res, { message: 'Company editing error', errors: errors })
            }

            const { id, name, cif, code, law_text } = req.body

            const company = await Company.findOne({ where: { id }, attributes: ['id'] })
            if (!company) {
                return this.unsuccess(res, { message: 'Company not exist' })
            }

            const newCompanyData = { name, cif, code, law_text }

            await Company.update( {  ...newCompanyData }, { where: { id } })
            const companies = await Company.findAll({ raw: true, attributes: ['id', 'name', 'cif', 'code', 'law_text'] })

            return this.success(res,{ companies })

        } catch (e) {
            this.error(res, e)
        }
    }
}

module.exports = new CompanyController()