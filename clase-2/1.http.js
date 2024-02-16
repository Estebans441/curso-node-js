const http = require('node:http');
const fs = require('node:fs');

const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
    if (req.url === '/') {
        console.log('request received', req.url);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Bienvenido a mi página de inicio!\n');
    }
    else if(req.url === '/GOAT.jpg'){
        console.log('request received', req.url);
        fs.readFile('GOAT.jpg', (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end('Internal Server Error');
            } else {
                res.setHeader('Content-Type', 'image/jpg');
                res.statusCode = 200;
                res.end(data);
            }
        });
    }
    else if(req.url === '/about') {
        console.log('request received', req.url);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end('<h1>Bienvenido a la página de about!</h1>\n');
    }
    else{
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end('Página no encontrada\n');
    }
}

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
    console.log(`Server listening on port http://localhost:${desiredPort}`);
});
