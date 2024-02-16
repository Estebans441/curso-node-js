// Forma sincrona de leer archivos
// Va a leer el archivo y va a esperar a que termine de leerlo para seguir con el codigo

const fs = require('node:fs')

console.log('Leyendo archivo 1...')
const text = fs.readFileSync('archivo.txt', 'utf-8')
console.log(text)

console.log('Leyendo archivo 2...')
const text2 = fs.readFileSync('archivo2.txt', 'utf-8')
console.log(text2)
