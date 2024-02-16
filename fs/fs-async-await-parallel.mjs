// Forma asincrona paralela de leer archivos

import { readFile } from 'node:fs/promises'

Promise.all([
    readFile('archivo.txt', 'utf-8'),
    readFile('archivo2.txt', 'utf-8')
]).then((texts) => {
    console.log('Primer texto', texts[0])
    console.log('Segundo texto', texts[1])
})
