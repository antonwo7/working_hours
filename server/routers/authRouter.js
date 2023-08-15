const Router = require('express')
const cors = require('cors')
const router = new Router()
const authController = require('../controllers/authController')
const {check} = require('express-validator')
const {dbConnect, dbClose} = require('../services/BDService')

router.use(cors())

router.post('/registration', [
    check('username', 'Username error').notEmpty(),
    check('password', 'Password error').notEmpty().isLength({min: 4, max: 10}),
    check('name', 'Name error').notEmpty().isLength({min: 4, max: 200}),
    check('nif', 'NIF error').notEmpty().isLength({min: 4, max: 200}),
    check('naf', 'NAF error').notEmpty().isLength({min: 4, max: 200}),
    check('contract_code', 'Contract code error').notEmpty().isLength({min: 4, max: 300})
], authController.registration)
router.post('/login', [
    check('username', 'Username error').notEmpty(),
    check('password', 'Password error').notEmpty().isLength({min: 4, max: 10}),
], authController.login)
router.post('/validation', [
    check('token', 'Token error').notEmpty()
], authController.tokenValidation)

module.exports = router