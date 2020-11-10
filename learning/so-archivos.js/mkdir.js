const fs = require ('fs')

fs.mkdir('platzi/escuela/ejemplo', { recursive: true }, (err) => {
    if (err){
        console.log(err)
    }
})