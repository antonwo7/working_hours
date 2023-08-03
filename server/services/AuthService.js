const jwt = require('jsonwebtoken')
const { secret, tokenExpiresIn } = require('../config')

class AuthService {
    static generateToken = (id, roles) => {
        return jwt.sign({ id, roles }, secret, { expiresIn: tokenExpiresIn })
    }
}

module.exports = AuthService