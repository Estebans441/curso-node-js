const path = require('path');

console.log(path.sep) // separador de rutas en el sistema operativo

// unir rutas con path.join
const filePath = path.join('/content', 'subfolder', 'test.txt')
console.log(filePath)

const base = path.basename(filePath) // obtiene el nombre del archivo
console.log(base)

const extension = path.extname(filePath) // obtiene la extension del archivo
console.log(extension)