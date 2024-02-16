// Forma asincrona secuencial de leer archivos

const fs = require('node:fs/promises')
// IIFE - Immediately Invoked Function Expression
// en .js
;(
    async () => {
        console.log('Leyendo archivo 1...')
        const text1 = await fs.readFile('archivo.txt', 'utf-8')
        console.log('Primer texto', text1)
    }
)()

;(
    async () => {
        console.log('Leyendo archivo 2...')
        const text2 = await fs.readFile('archivo2.txt', 'utf-8')
        console.log('Segundo texto', text2)
    }
)()

console.log('---> Haciendo algo mientras se lee el archivo...')

/* en .mjs
import { readFile } from 'node:fs/promises'

console.log('Leyendo archivo 1...')
const text1 = await readFile('archivo.txt', 'utf-8')
console.log('Primer texto', text1)
console.log('---> Haciendo algo mientras se lee el archivo...')
console.log('Leyendo archivo 2...')
const text2 = await readFile('archivo2.txt', 'utf-8')
console.log('Segundo texto', text2)
*/
