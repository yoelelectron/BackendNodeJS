const os = require ('os')

// console.log("CPU info", os.cpus())
// console.log("Ip Address: ", os.networkInterfaces().lo.map(i => i.address))
// console.log("Free Memory ", os.freemem())
// console.log("Type: ", os.type())
console.log("OS Version, ", os.version())
console.log("USR info, ", os.userInfo())