require('dotenv').config()
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const AuthService = require('../services/AuthService')
const userInit = require("../models/User");
const roleInit = require("../models/Role");
const { roleNames } = require('../config')


class authController {
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

            const { username, password } = req.body
            const user = await User.findOne({ where: { username }, attributes: ['id', 'username', 'password', 'role', 'name', 'nif', 'naf', 'contract_code'] })
            if (!user) {
                return res.status(200).json({ result: false, message: 'User not found' })
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(200).json({ result: false, message: 'Password incorrect' })
            }
            const token = AuthService.generateToken(user.id, user.role)
            const userRole = await Role.findOne({ where: { id: user.role }, attributes: ['name'] })
            const userRoleName = userRole ? userRole.name : null

            return res.json({ result: true, token: token, user: { name: user.name, username: user.username, nif: user.nif, naf: user.naf, contract_code: user.contract_code, id: user.id, role: userRoleName } })

        } catch (e) {
            this.error(res, e)
        }
    }

    tokenValidation = async (req, res) => {
        try {
            const User = await userInit()
            const Role = await roleInit()

            const { token } = req.body
            if (!token) {
                return res.status(200).json({ result: false, message: 'Empty token' })
            }

            const registeredUser = await AuthService.validateToken(token, User, Role)
            if (!registeredUser) {
                return res.status(200).json({ result: false, message: 'User unknown' })
            }

            const users = registeredUser.role === roleNames.admin
                ? await User.findAll({ attributes: ['id', 'username', 'role', 'name', 'nif', 'naf', 'contract_code'] })
                : []

            return res.json({ result: true, user: { ...registeredUser }, users: users })

        } catch (e) {
            this.error(res, e)
        }
    }

    async getUsers(req, res) {
        try {
            const User = await userInit()

            const { token } = req.body
            if (!token) {
                return res.status(200).json({ result: false, message: 'Empty token' })
            }

            const registeredUser = AuthService.validateToken
            if (!registeredUser) {
                return res.status(200).json({ result: false, message: 'User unknown' })
            }

            const users = await User.findAll({ raw: true, attributes: ['id', 'username', 'role', 'name', 'nif', 'naf', 'contract_code'] })
            return res.json({ users: users })

        } catch (e) {
            this.error(res, e)
        }
    }

    error = (res, e) => {
        !(e instanceof Error) && (e = new Error(e))
        res.status(200).json({ result: false, message: e.message })
    }
}

module.exports = new authController()