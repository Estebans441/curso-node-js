// argumentos de entrada
console.log(process.argv);

// controlar el proceso

process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});

// current working directory
console.log(process.cwd());

// platform
console.log(process.platform);

// process.exit(0); // 0 es el código de salida
