const assert = require('assert')
const proxyquire = require('proxyquire')

const { moviesMock, movieServicesMock } = require('../utils/mocks/movies')
const testServer = require ('../utils/testServer')

describe('routes - movies', function () {
    const route = proxyquire('../routes/movies.js', {
        '../services/movies.js' : movieServicesMock
    })

    const request = testServer(route)
    describe('GET /movies', function() {
        it('should respond with 200', function (done) {
            request.get('/api/movies').expect(200, done)
        })

        it('should respond list of movies', function (done) {
            request.get('/api/movies').end((err, res) => {
                assert.deepEqual(res.body, {
                    data: moviesMock,
                    message: 'movies listed'
                })
                done()
            })
        })
    })
})