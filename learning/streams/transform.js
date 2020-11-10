const { Transform } = require ('stream')

// const transformStream = new Transform({
//     transform(chunk, encoding, cb) {
//         this.push(chunk.toString().toUpperCase())
//         cb()
//     }
// })

// process.stdin.pipe(transformStream).pipe(process.stdout)


const camelStream = new Transform({
    transform(chunk, callback) {
        const data = chunk.toString();
        data.split(" ").map((word, index) => {
            this.push(word.charAt(0).toUpperCase() + word.slice(1));
        });
    }
});

process.stdin.pipe(camelStream).pipe(process.stdout);