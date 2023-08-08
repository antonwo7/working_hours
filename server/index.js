require('dotenv').config()
const express = require('express')

const authRouter = require('./routers/authRouter')
const userRouter = require('./routers/userRouter')
const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use('/auth', authRouter)
app.use('/user', userRouter)

const start = async () => {
    try {
        app.listen(PORT, () => console.log('server started on PORT: ' + PORT))

    } catch (e) {
        console.log(e)
    }
}

start()