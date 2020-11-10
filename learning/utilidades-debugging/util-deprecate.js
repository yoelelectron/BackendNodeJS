const util = require ('util')

const helloBrian = util.deprecate(() => {
    console.log('hello brian')
}, 'Brian is gay. It is not a man anymore')

helloBrian()