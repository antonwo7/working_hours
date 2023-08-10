const jwt = require('jsonwebtoken')
const { secret, tokenExpiresIn } = require('../config')
const moment = require('moment')
const userInit = require("../models/User");
const roleInit = require("../models/Role");
const dayInit = require("../models/Day");

class AuthService {
    constructor() {
        userInit.then(User => this.User = User)
        roleInit.then(Role => this.Role = Role)
    }

    generateToken = (id, role) => {
        return jwt.sign({ id, role }, secret, { expiresIn: tokenExpiresIn })
    }

    decodeToken = (token) => {
        return jwt.verify(token, secret);
    }

    validateToken = async (token) => {
        const User = this.User
        const Role = this.Role

        const tokenData = this.decodeToken(token)
        if (!tokenData || !tokenData.id || !tokenData.role) return false

        if (tokenData.exp <= moment().unix()) return false

        const user = await User.findOne({ raw: true, where: { id: tokenData.id }, attributes: ['id', 'username', 'role', 'name', 'nif', 'naf', 'contract_code'] })
        if (!user) return false

        const userRole = await Role.findOne({ raw: true, where: { name: tokenData.role }, attributes: ['name'] })
        if (!userRole) return false

        return { ...user, role: tokenData.role }
    }
}

module.exports = new AuthService()