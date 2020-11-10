const util = require('util')

/*
%s String
%d Number 
%j Json
*/

console.log("un %s y un %s", "perrito", "gatito")

/*
Es lo mismo que usar en la consola de Node

util.format("un %s y un %s", "perrito", "gatito")

*/

console.info("Hello world") // alias para el console.log

console.assert(42 === "42")

// console.trace("z+3")

const debugLog = util.debuglog("foo")

debugLog("Hello from foo") // se ejecuta con la variable de entorno y el argumento: NODE_DEBUG=foo node archivo.js