class Controller {
    error = (res, e) => {
        !(e instanceof Error) && (e = new Error(e))
        res.status(200).json({ result: false, message: e.message })
    }
}

module.exports = Controller