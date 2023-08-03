const Router = require('express')
const router = new Router()
const authController = require('../controllers/authController')
const { check } = require('express-validator')

router.post('/registration', [
    check('username', 'Username error').notEmpty(),
    check('password', 'Password error').notEmpty().isLength({min: 4, max: 10}),
    check('name', 'Name error').notEmpty().isLength({min: 4, max: 200}),
    check('nif', 'NIF error').notEmpty().isLength({min: 4, max: 200}),
    check('naf', 'NAF error').notEmpty().isLength({min: 4, max: 200}),
    check('contract_code', 'Contract code error').notEmpty().isLength({min: 4, max: 300})
], authController.registration)
router.post('/login', authController.login)
router.get('/users', authController.getUsers)

module.exports = router