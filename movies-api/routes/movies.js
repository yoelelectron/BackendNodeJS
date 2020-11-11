const { required } = require('@hapi/joi')
const express = require ('express')
const MoviesService = require('../services/movies')
const { movieIdSchema, createMovieSchema, updateMovieSchema } = require('../utils/schemas/movies')

const validationHandler = require('../utils/middleware/validationHandler')
const cacheResponse = require('../utils/cacheResponse')
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../utils/time')

function moviesApi(app) {
    const router = express.Router()
    app.use('/api/movies', router)

    const moviesServices = new MoviesService()

    router.get('/', async function(req,res, next) {
        const { tags } = req.query
        try {
            const movies = await moviesServices.getMovies({ tags })
            //throw new Error('error getting movies')
            res.status(200).json({
                data:movies,
                message: 'movies listed'
            })
        } catch (error) {
            next(error)
        }
    })

    router.get('/:movieId', validationHandler({ movieId: movieIdSchema}, 'params'), async function(req,res, next) {
        const { movieId } = req.params
        try {
            const movies = await moviesServices.getMovie({ movieId })
            res.status(200).json({
                data:movies,
                message: 'movie retrieved'
            })
        } catch (error) {
            next(error)
        }
    })

    router.post('/', validationHandler(createMovieSchema), async function(req,res, next) {
        const { body: movie } = req
        try {
            const createMovieId = await moviesServices.createMovie({ movie })
            res.status(201).json({
                data:createMovieId,
                message: 'movie created'
            })
        } catch (error) {
            next(error)
        }
    })

    router.put('/:movieId',  validationHandler({ movieId: movieIdSchema}, 'params'), validationHandler(updateMovieSchema),async function(req,res, next) {
        const { movieId } = req.params
        const { body: movie } = req
        try {
            const updatedMovieId = await moviesServices.updateMovie({
                movieId,
                movie
            })
            res.status(200).json({
                data:updatedMovieId,
                message: 'movie updated'
            })
        } catch (error) {
            next(error)
        }
    })

    router.delete('/:movieId',validationHandler({ movieId: movieIdSchema}), async function(req,res, next) {
        const { movieId } = req.params
        try {
            const deletedMovieId = await moviesServices.deleteMovie({ movieId })
            res.status(200).json({
                data:deletedMovieId,
                message: 'movie deleted'
            })
        } catch (error) {
            next(error)
        }
    })
}

module.exports = moviesApi
