const authMiddleWare = require('../middlewares/authMiddleware')
const Router = require('express')
const cors = require('cors')
const router = new Router()
const companyController = require('../controllers/companyController')
const { check } = require('express-validator')

router.use(cors())

router.post('/get_companies', [], companyController.getCompanies)

router.post('/edit_company', [
    authMiddleWare.authValidation,
    authMiddleWare.adminValidation,
    check('id', 'Id error').notEmpty(),
    check('name', 'Name error').notEmpty(),
    check('cif', 'Cif error').notEmpty(),
    check('code', 'Code error').notEmpty()
], companyController.editCompany)

module.exports = router