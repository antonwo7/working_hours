const Controller = require('../controllers/Controller')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const authService = require('../services/AuthService')
const User = require("../models/User")
const Role = require("../models/Role")
const Day = require("../models/Day")
const Company = require("../models/Company")
const {roleNames} = require('../config')


class authController extends Controller {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return this.unsuccess(res, { message: 'Registration error', errors: errors })
            }

            const { username, password, name, nif, naf, contract_code, date } = req.body
            const candidate = await User.findOne({ where: { username }, attributes: ['id', 'username'] })
            if (candidate) {
                return this.unsuccess(res,{ message: "User exist", candidate })
            }

            const hashedPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({ where: { name: roleNames.user }, attributes: ['id', 'name'] })
            User.create({ username, password: hashedPassword, role: userRole.id, name, nif, naf, contract_code, date  })

            return this.success(res,{ message: 'User registered' })

        } catch (e) {
            this.error(res, e)
        }
    }

    login = async (req, res) => {
        try {
            const { username, password } = req.body
            const user = await User.findOne({ raw: true, where: { username }, attributes: ['id', 'username', 'password', 'role', 'name', 'nif', 'naf', 'contract_code', 'date'] })
            if (!user) {
                return this.unsuccess(res,{ message: 'User not found' })
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return this.unsuccess(res,{ message: 'Password incorrect' })
            }

            const userRole = await Role.findOne({ where: { id: user.role }, attributes: ['name'] })
            const userRoleName = userRole ? userRole.name : null
            const token = authService.generateToken(user.id, userRoleName)

            const days = await Day.findAll({ where: { user_id: user.id }, attributes: ['id', 'date'] })

            const users = userRoleName === roleNames.admin
                ? await User.findAll({ attributes: ['id', 'username', 'role', 'name', 'nif', 'naf', 'contract_code', 'date'] })
                : []

            const companies = userRoleName === roleNames.admin
                ? await Company.findAll({ attributes: ['id', 'name', 'cif', 'code', 'law_text'] })
                : []

            delete user.password
            user.role = userRoleName

            return this.success(res,{ token: token, user: { ...user }, users, days, companies })

        } catch (e) {
            this.error(res, e)
        }
    }

    tokenValidation = async (req, res) => {
        try {
            const { token } = req.body
            if (!token) {
                return this.unsuccess(res,{ message: 'Empty token' })
            }

            const authUser = await authService.validateToken(token)
            if (!authUser) {
                return this.unsuccess(res,{ message: 'User unknown' })
            }

            const days = await Day.findAll({ where: { user_id: authUser.id }, attributes: ['id', 'date'] })

            const users = authUser.role === roleNames.admin
                ? await User.findAll({ attributes: ['id', 'username', 'role', 'name', 'nif', 'naf', 'contract_code', 'date'] })
                : []

            const companies = authUser.role === roleNames.admin
                ? await Company.findAll({ attributes: ['id', 'name', 'cif', 'code', 'law_text'] })
                : []

            return this.success(res, { user: { ...authUser }, users, days, companies })

        } catch (e) {
            this.error(res, e)
        }
    }
}

module.exports = new authController()