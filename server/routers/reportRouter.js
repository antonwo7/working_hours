const authMiddleWare = require('../middlewares/authMiddleware')
const Router = require('express')
const cors = require('cors')
const router = new Router()
const userController = require('../controllers/userController')
const reportController = require('../controllers/reportController')
const AuthService = require("../services/AuthService");
const { check } = require('express-validator')

router.use(cors())

router.post('/generate_report', [
    authMiddleWare.authValidation,
    authMiddleWare.adminValidation,
    check('user_id', 'User Id error').notEmpty(),
    check('months', 'Month error').notEmpty().isArray(),
], reportController.generateReport)

module.exports = router