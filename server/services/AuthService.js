const jwt = require('jsonwebtoken')
const { secret, tokenExpiresIn } = require('../config')

class AuthService {
    static generateToken = (id, role) => {
        return jwt.sign({ id, role }, secret, { expiresIn: tokenExpiresIn })
    }

    static decodeToken = (token) => {
        return jwt.verify(token, secret);
    }
}

module.exports = AuthService