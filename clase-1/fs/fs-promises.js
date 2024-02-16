const fs = require('node:fs/promises')

console.log('Leyendo archivo 1...')
fs.readFile('archivo.txt', 'utf-8').then((text) => {
    console.log(text) 
})

console.log('---> Haciendo algo mientras se lee el archivo...')

console.log('Leyendo archivo 2...')
fs.readFile('archivo2.txt', 'utf-8').then((text) => {
    console.log(text) 
})