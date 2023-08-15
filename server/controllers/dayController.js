const {Op} = require('sequelize')

const date = require('date-and-time')
const {sequelize} = require('../services/BDService')
const Controller = require('../controllers/Controller')
const {validationResult} = require('express-validator')
const Day = require("../models/Day")


class dayController extends Controller {
    getDays = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return this.unsuccess(res,{ message: 'Days getting error', errors: errors })
            }

            const authUser = req.authUser
            const {month} = req.body

            const days = await Day.findAll({
                where: {
                    [Op.and]: [
                        sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), month),
                        {
                            user_id: authUser.id,
                        }
                    ]
                },
                attributes: ['id', 'date']
            })

            return this.success(res, { days: days })

        } catch (e) {
            this.error(res, e)
        }
    }

    addDay = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return this.unsuccess(res,{ message: 'Days adding error', errors: errors })
            }

            const { day } = req.body
            const authUser = req.authUser

            const dayDate = new Date()
            dayDate.setDate(parseInt(day.split('-')[0]))
            dayDate.setMonth(parseInt(day.split('-')[1]) - 1)
            dayDate.setFullYear(parseInt(day.split('-')[2]))
            dayDate.setHours(12, 0, 0)

            const candidateDay = await Day.findOne({ where: { user_id: authUser.id, date: dayDate }, attributes: ['id'] })
            if (candidateDay) {
                return this.unsuccess(res,{ message: 'Day already signed' })
            }

            await Day.create({ date: dayDate, user_id: authUser.id })
            const days = await Day.findAll({ attributes: ['id', 'date'], where: { user_id: authUser.id } })

            return this.success(res,{ days: days })

        } catch (e) {
            this.error(res, e)
        }
    }

    removeDay = async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return this.unsuccess(res,{ message: 'Days removing error', errors: errors })
            }

            const authUser = req.authUser
            const { id } = req.body

            const candidateDay = await Day.findOne({ where: { id, user_id: authUser.id }, attributes: ['id'] })
            if (!candidateDay) {
                return this.unsuccess(res,{ message: "Day not exist", candidateDay })
            }

            await Day.destroy({ where: { id } })
            const days = await Day.findAll({ attributes: ['id', 'date'], where: { user_id: authUser.id } })

            return this.success(res,{ days })

        } catch (e) {
            this.error(res, e)
        }
    }
}

module.exports = new dayController()