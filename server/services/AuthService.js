const jwt = require('jsonwebtoken')
const { secret, tokenExpiresIn } = require('../config')
const moment = require('moment')

class AuthService {
    static generateToken = (id, role) => {
        return jwt.sign({ id, role }, secret, { expiresIn: tokenExpiresIn })
    }

    static decodeToken = (token) => {
        return jwt.verify(token, secret);
    }

    static validateToken = async (token, User, Role) => {
        const tokenData = AuthService.decodeToken(token)
        if (!tokenData || !tokenData.id || !tokenData.role) return false

        if (tokenData.exp <= moment().unix()) return false

        const user = await User.findOne({ raw: true, where: { id: tokenData.id }, attributes: ['id', 'username', 'role', 'name', 'nif', 'naf', 'contract_code'] })
        if (!user) return false

        const userRole = await Role.findOne({ raw: true, where: { name: tokenData.role }, attributes: ['name'] })
        if (!userRole) return false

        return { ...user, role: tokenData.role }
    }
}

module.exports = AuthService