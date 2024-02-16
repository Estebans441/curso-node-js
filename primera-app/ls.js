const fs = require('node:fs');

fs.readdir('./', (err, files) => {
    if(err) {
        console.error(err, "Error reading directory")
        return
    }

    files.forEach(file => {
        console.log(file)
    })
})