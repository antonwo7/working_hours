const {authValidation} = require('../middlewares/authMiddlewares');
const Router = require('express')
const cors = require('cors')
const router = new Router()
const dayController = require('../controllers/dayController')
const AuthService = require("../services/AuthService");
const { check } = require('express-validator')

router.use(cors())

router.post('/get_days', [
    authValidation
], dayController.getDays)

router.post('/add_day', [
    authValidation,
    check('day', 'Date error').notEmpty()
], dayController.addDay)

router.post('/remove_day', [
    authValidation,
    check('id', 'Id error').notEmpty()
], dayController.removeDay)

module.exports = router