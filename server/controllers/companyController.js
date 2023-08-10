const Controller = require('../controllers/Controller')
require('dotenv').config()
const { validationResult } = require('express-validator')
const companyInit = require("../models/Company")


class CompanyController extends Controller {
    constructor() {
        super()

        companyInit.then(Company => this.Company = Company)
    }

    getCompanies = async (req, res) => {
        const Company = this.Company

        try {

            const { token } = req.body
            if (!token) {
                return res.status(200).json({ result: false, message: 'Empty token' })
            }

            const companies = await Company.findAll({ attributes: ['id', 'name', 'cif', 'code', 'law_text'] })
            return res.json({ companies })

        } catch (e) {
            this.error(res, e)
        }
    }

    editCompany = async (req, res) => {
        const Company = this.Company
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(200).json({ result: false, message: 'Company editing error', errors: errors })
            }

            const { id, name, cif, code, law_text } = req.body

            const company = await Company.findOne({ where: { id }, attributes: ['id'] })
            if (!company) {
                return res.status(200).json({ result: false, message: "Company not exist", company })
            }

            const newCompanyData = { name, cif, code, law_text }

            await Company.update( {  ...newCompanyData }, { where: { id } })
            const companies = await Company.findAll({ raw: true, attributes: ['id', 'name', 'cif', 'code', 'law_text'] })

            return res.status(200).json({ result: true, companies })

        } catch (e) {
            this.error(res, e)
        }
    }
}

module.exports = new CompanyController()