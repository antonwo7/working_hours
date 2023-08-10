const authMiddleWare = require('../middlewares/authMiddleware')
const Router = require('express')
const cors = require('cors')
const router = new Router()
const dayController = require('../controllers/dayController')
const { check } = require('express-validator')

router.use(cors())

router.post('/get_days', [
    authMiddleWare.authValidation,
    check('month', 'Month number error').notEmpty()
], dayController.getDays)

router.post('/add_day', [
    authMiddleWare.authValidation,
    check('day', 'Date error').notEmpty()
], dayController.addDay)

router.post('/remove_day', [
    authMiddleWare.authValidation,
    check('id', 'Id error').notEmpty()
], dayController.removeDay)

module.exports = router