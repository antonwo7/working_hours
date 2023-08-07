const jwt = require('jsonwebtoken')
const { secret, tokenExpiresIn } = require('../config')

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

        const user = await User.findOne({ raw: true, where: { id: tokenData.id }, attributes: ['id', 'username', 'role', 'name', 'nif', 'naf', 'contract_code'] })
        if (!user) return false

        const userRole = await Role.findOne({ raw: true, where: { id: user.role }, attributes: ['name'] })
        const userRoleName = userRole ? userRole.name : null

        return { ...user, role: userRoleName }
    }
}

module.exports = AuthService