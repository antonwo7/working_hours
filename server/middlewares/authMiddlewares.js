const AuthService = require("../services/AuthService");
const userInit = require("../models/User");
const roleInit = require("../models/Role");
const {roleNames} = require("../config");

const authValidation = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: "Tu petición no tiene cabecera de autorización" });
    }

    const User = await userInit()
    const Role = await roleInit()

    const token = req.headers.authorization.split(" ")[1];

    const authUser = await AuthService.validateToken(token, User, Role)
    if (!authUser) {
        return res.status(200).json({ result: false, message: 'User unknown' })
    }

    req.authUser = authUser

    next();
};

const adminValidation = async (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(200).json({ result: false, message: 'Token empty' })
    }

    const token = req.headers.authorization.split(" ")[1];

    const tokenData = AuthService.decodeToken(token)
    if (!tokenData) {
        return res.status(200).json({ result: false, message: 'Token invalid' })
    }

    if (!tokenData.role) {
        return res.status(200).json({ result: false, message: 'Empty Role in Token' })
    }

    if (tokenData.role !== roleNames.admin) {
        return res.status(200).json({ result: false, message: 'Access denied' })
    }

    next();
}

module.exports = {authValidation, adminValidation}