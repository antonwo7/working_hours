require('dotenv').config()
const express = require('express')
const databaseInit = require('./services/BDService')

const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const dayRouter = require('./routers/dayRouter')
const companyRouter = require('./routers/companyRouter')
const reportRouter = require('./routers/reportRouter')

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/day', dayRouter)
app.use('/company', companyRouter)
app.use('/report', reportRouter)

const start = async () => {
    try {
        app.listen(PORT, () => console.log('server started on PORT: ' + PORT))

    } catch (e) {
        console.log(e)
    }
}

start()