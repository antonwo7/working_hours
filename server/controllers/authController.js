const Controller = require('../controllers/Controller')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const authService = require('../services/AuthService')
const userInit = require("../models/User");
const roleInit = require("../models/Role");
const dayInit = require("../models/Day");
const companyInit = require("../models/Company");
const { roleNames } = require('../config')


class authController extends Controller {

    constructor() {
        super()

        userInit.then(User => this.User = User)
        roleInit.then(Role => this.Role = Role)
        dayInit.then(Day => this.Day = Day)
        companyInit.then(Company => this.Company = Company)
    }

    async registration(req, res) {
        try {
            const User = this.User
            const Role = this.Role

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(200).json({ result: false, message: 'Registration error', errors: errors })
            }
            const { username, password, name, nif, naf, contract_code } = req.body
            const candidate = await User.findOne({ where: { username }, attributes: ['id', 'username'] })
            if (candidate) {
                return res.status(200).json({ result: false, message: "User exist", candidate })
            }

            const hashedPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({ where: { name: roleNames.user }, attributes: ['id', 'name'] })
            User.create({ username, password: hashedPassword, role: userRole.id, name, nif, naf, contract_code  })

            return res.json({ result: true, message: 'User registered' })

        } catch (e) {
            this.error(res, e)
        }
    }

    login = async (req, res) => {
        try {
            const User = this.User
            const Role = this.Role
            const Day = this.Day
            const Company = this.Company

            const { username, password } = req.body
            const user = await User.findOne({ raw: true, where: { username }, attributes: ['id', 'username', 'password', 'role', 'name', 'nif', 'naf', 'contract_code'] })
            if (!user) {
                return res.status(200).json({ result: false, message: 'User not found' })
            }


            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(200).json({ result: false, message: 'Password incorrect' })
            }

            const userRole = await Role.findOne({ where: { id: user.role }, attributes: ['name'] })
            const userRoleName = userRole ? userRole.name : null
            const token = authService.generateToken(user.id, userRoleName)

            const days = await Day.findAll({ where: { user_id: user.id }, attributes: ['id', 'date'] })

            const users = userRoleName === roleNames.admin
                ? await User.findAll({ attributes: ['id', 'username', 'role', 'name', 'nif', 'naf', 'contract_code'] })
                : []

            const companies = userRoleName === roleNames.admin
                ? await Company.findAll({ attributes: ['id', 'name', 'cif', 'code', 'law_text'] })
                : []

            delete user.password
            user.role = userRoleName

            return res.json({ result: true, token: token, user: { ...user }, users, days, companies })

        } catch (e) {
            this.error(res, e)
        }
    }

    tokenValidation = async (req, res) => {
        try {
            const User = this.User
            const Role = this.Role
            const Day = this.Day
            const Company = this.Company

            const { token } = req.body
            if (!token) {
                return res.status(200).json({ result: false, message: 'Empty token' })
            }

            const authUser = await authService.validateToken(token)
            if (!authUser) {
                return res.status(200).json({ result: false, message: 'User unknown' })
            }

            const days = await Day.findAll({ where: { user_id: authUser.id }, attributes: ['id', 'date'] })

            const users = authUser.role === roleNames.admin
                ? await User.findAll({ attributes: ['id', 'username', 'role', 'name', 'nif', 'naf', 'contract_code'] })
                : []

            const companies = authUser.role === roleNames.admin
                ? await Company.findAll({ attributes: ['id', 'name', 'cif', 'code', 'law_text'] })
                : []

            return res.json({ result: true, user: { ...authUser }, users, days, companies })

        } catch (e) {
            this.error(res, e)
        }
    }
}

module.exports = new authController()