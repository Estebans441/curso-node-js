// Forma asincrona por callback de leer archivos

const fs = require('node:fs')

console.log('Leyendo archivo 1...')
const text = fs.readFile('archivo.txt', 'utf-8', (err, text) => {
    if (err) {
        console.error('Error al leer el archivo:', err)
        return
    }
    console.log(text)
})

console.log('---> Haciendo algo mientras se lee el archivo...')

console.log('Leyendo archivo 2...')
const text2 = fs.readFile('archivo2.txt', 'utf-8', (err, text) => {
    if (err) {
        console.error('Error al leer el archivo:', err)
        return
    }
    console.log(text)
})
