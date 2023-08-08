const Controller = require('../controllers/Controller')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const AuthService = require('../services/AuthService')
const userInit = require("../models/User");
const roleInit = require("../models/Role");
const dayInit = require("../models/Day");
const { roleNames } = require('../config')


class authController extends Controller {
    async registration(req, res) {
        try {
            const User = await userInit()
            const Role = await roleInit()

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
            const User = await userInit()
            const Role = await roleInit()
            const Day = await dayInit()

            const { username, password } = req.body
            const user = await User.findOne({ where: { username }, attributes: ['id', 'username', 'password', 'role', 'name', 'nif', 'naf', 'contract_code'] })
            if (!user) {
                return res.status(200).json({ result: false, message: 'User not found' })
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(200).json({ result: false, message: 'Password incorrect' })
            }

            const userRole = await Role.findOne({ where: { id: user.role }, attributes: ['name'] })
            const userRoleName = userRole ? userRole.name : null
            const token = AuthService.generateToken(user.id, userRoleName)

            const days = await Day.findAll({ where: { user_id: user.id }, attributes: ['id', 'date'] })

            return res.json({ result: true, token: token, user: { name: user.name, username: user.username, nif: user.nif, naf: user.naf, contract_code: user.contract_code, id: user.id, role: userRoleName }, days })

        } catch (e) {
            this.error(res, e)
        }
    }

    tokenValidation = async (req, res) => {
        try {
            const User = await userInit()
            const Role = await roleInit()
            const Day = await dayInit()

            const { token } = req.body
            if (!token) {
                return res.status(200).json({ result: false, message: 'Empty token' })
            }

            const authUser = await AuthService.validateToken(token, User, Role)
            if (!authUser) {
                return res.status(200).json({ result: false, message: 'User unknown' })
            }

            const days = await Day.findAll({ where: { user_id: authUser.id }, attributes: ['id', 'date'] })

            const users = authUser.role === roleNames.admin
                ? await User.findAll({ attributes: ['id', 'username', 'role', 'name', 'nif', 'naf', 'contract_code'] })
                : []

            return res.json({ result: true, user: { ...authUser }, users, days })

        } catch (e) {
            this.error(res, e)
        }
    }
}

module.exports = new authController()