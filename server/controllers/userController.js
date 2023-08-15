const Controller = require('../controllers/Controller')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const authService = require('../services/AuthService')
const User = require("../models/User")
const Role = require("../models/Role")
const {sequelize} = require("../services/BDService");
const {roleNames} = require('../config')


class userController extends Controller {
    getUsers = async (req, res) => {
        try {
            const { token } = req.body
            if (!token) {
                return this.unsuccess(res,{ message: 'Empty token' })
            }

            const registeredUser = authService.validateToken
            if (!registeredUser) {
                return this.unsuccess(res,{ message: 'User unknown' })
            }

            const users = await User.findAll({ raw: true, attributes: ['id', 'username', 'role', 'name', 'nif', 'naf', 'contract_code'] })
            return this.success(res,{ users: users })

        } catch (e) {
            this.error(res, e)
        }
    }

    addUser = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return this.unsuccess(res,{ message: 'User adding error', errors: errors })
            }

            const { username, password, name, nif, naf, contract_code } = req.body
            const candidate = await User.findOne({ where: { username }, attributes: ['id', 'username'] })
            if (candidate) {
                return this.unsuccess(res,{ message: "User exist", candidate })
            }

            const hashedPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({ where: { name: roleNames.user }, attributes: ['id', 'name'] })
            if (!userRole) {
                return this.unsuccess(res,{ message: "Role not exist" })
            }

            await User.create({ username, password: hashedPassword, role: userRole.id, name, nif, naf, contract_code  })

            const users = await User.findAll({ raw: true, attributes: ['id', 'username', 'name', 'nif', 'naf', 'contract_code'] })

            return this.success(res,{ users: users })

        } catch (e) {
            this.error(res, e)
        }
    }

    removeUser = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return this.unsuccess(res,{ message: 'User removing error', errors: errors })
            }

            const { id } = req.body

            const candidate = await User.findOne({ where: { id }, attributes: ['id'] })
            if (!candidate) {
                return this.unsuccess(res,{ message: "User not exist", candidate })
            }

            await User.destroy({ where: { id } })

            const users = await User.findAll({ raw: true, attributes: ['id', 'username', 'name', 'nif', 'naf', 'contract_code'] })

            return this.success(res,{ users: users })

        } catch (e) {
            this.error(res, e)
        }
    }

    editUser = async(req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return this.unsuccess({ message: 'User editing error', errors: errors })
            }

            const { id, username, password, name, nif, naf, contract_code } = req.body

            const candidate = await User.findOne({ where: { id }, attributes: ['id'] })
            if (!candidate) {
                return this.unsuccess(res,{ message: "User not exist", candidate })
            }

            const newUserData = { username, name, nif, naf, contract_code }

            if (password) {
                newUserData.password = bcrypt.hashSync(password, 7)
            }

            await User.update( {  ...newUserData }, { where: { id } })
            const users = await User.findAll({ raw: true, attributes: ['id', 'username', 'name', 'nif', 'naf', 'contract_code'] })

            return this.success(res,{ users: users })

        } catch (e) {
            this.error(res, e)
        }
    }
}

module.exports = new userController()