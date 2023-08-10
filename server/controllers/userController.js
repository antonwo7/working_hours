const Controller = require('../controllers/Controller')
require('dotenv').config()
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const authService = require('../services/AuthService')
const userInit = require("../models/User");
const roleInit = require("../models/Role");
const { roleNames } = require('../config')


class userController extends Controller {
    constructor() {
        super()

        userInit.then(User => this.User = User)
        roleInit.then(Role => this.Role = Role)
    }

    getUsers = async (req, res) => {
        const User = this.User

        try {

            const { token } = req.body
            if (!token) {
                return res.status(200).json({ result: false, message: 'Empty token' })
            }

            const registeredUser = authService.validateToken
            if (!registeredUser) {
                return res.status(200).json({ result: false, message: 'User unknown' })
            }

            const users = await User.findAll({ raw: true, attributes: ['id', 'username', 'role', 'name', 'nif', 'naf', 'contract_code'] })
            return res.json({ users: users })

        } catch (e) {
            this.error(res, e)
        }
    }

    addUser = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(200).json({ result: false, message: 'User adding error', errors: errors })
            }

            const User = this.User
            const Role = this.Role

            const { username, password, name, nif, naf, contract_code } = req.body
            const candidate = await User.findOne({ where: { username }, attributes: ['id', 'username'] })
            if (candidate) {
                return res.status(200).json({ result: false, message: "User exist", candidate })
            }

            const hashedPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({ where: { name: roleNames.user }, attributes: ['id', 'name'] })
            if (!userRole) {
                return res.status(200).json({ result: false, message: "Role not exist" })
            }

            await User.create({ username, password: hashedPassword, role: userRole.id, name, nif, naf, contract_code  })

            const users = await User.findAll({ raw: true, attributes: ['id', 'username', 'name', 'nif', 'naf', 'contract_code'] })

            return res.status(200).json({ result: true, users: users })

        } catch (e) {
            this.error(res, e)
        }
    }

    removeUser = async (req, res) => {
        const User = this.User
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(200).json({ result: false, message: 'User removing error', errors: errors })
            }

            const { id } = req.body

            const candidate = await User.findOne({ where: { id }, attributes: ['id'] })
            if (!candidate) {
                return res.status(200).json({ result: false, message: "User not exist", candidate })
            }

            await User.destroy({ where: { id } })

            const users = await User.findAll({ raw: true, attributes: ['id', 'username', 'name', 'nif', 'naf', 'contract_code'] })

            return res.status(200).json({ result: true, users: users })

        } catch (e) {
            this.error(res, e)
        }
    }

    editUser = async(req, res) => {
        const User = this.User
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(200).json({ result: false, message: 'User editing error', errors: errors })
            }

            const { id, username, password, name, nif, naf, contract_code } = req.body

            const candidate = await User.findOne({ where: { id }, attributes: ['id'] })
            if (!candidate) {
                return res.status(200).json({ result: false, message: "User not exist", candidate })
            }

            const newUserData = { username, name, nif, naf, contract_code }

            if (password) {
                newUserData.password = bcrypt.hashSync(password, 7)
            }

            await User.update( {  ...newUserData }, { where: { id } })
            const users = await User.findAll({ raw: true, attributes: ['id', 'username', 'name', 'nif', 'naf', 'contract_code'] })

            return res.status(200).json({ result: true, users: users })

        } catch (e) {
            this.error(res, e)
        }
    }
}

module.exports = new userController()