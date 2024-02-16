const os = require('node:os')

console.log('Informacion del sistema operativo:')
console.log('----------------------------')

console.log('Nombre del sistema opertaivo:', os.platform())
console.log('Version del sistema operativo:', os.release())
console.log('Arquitectura:', os.arch())
console.log('CPU:', os.cpus())
console.log('Memoria total:', os.totalmem(), 'bytes')
console.log('Memoria libre:', os.freemem(), 'bytes')
console.log('uptime:', os.uptime()/60/60, 'horas')
console.log('----------------------------')