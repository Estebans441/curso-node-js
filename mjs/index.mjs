// .js --> por defecto utiliza CommonJS
// .mjs --> por defecto utiliza ES Modules
// .cjs --> por defecto utiliza CommonJS

import { sum, substract, multiply, divide } from "./ops.mjs";

console.log(sum(1, 2));
console.log(substract(1, 2));
console.log(multiply(1, 2));