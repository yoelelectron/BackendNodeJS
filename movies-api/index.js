const express = require ('express')

const app = express ()

const { config } = require('./config/index')
const moviesApi = require('./routes/movies')
const { logErrors, errorHandler, wrapError } = require('./utils/middleware/errorHandler')
const notFoundHandler = require('./utils/middleware/notFoundHandler')

//bodyparser middleware
app.use(express.json())
moviesApi(app)


app.use(notFoundHandler)
app.use(logErrors)
app.use(wrapError)
app.use(errorHandler)


app.listen(config.port, function() {
    console.log(`listening at: ${config.port}`)
})