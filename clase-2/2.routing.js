const http = require('node:http');

// CommonJS
const dittoJSON = require('./pokemon/ditto.json');

const processRequest = (req, res) => {
    const {method, url} = req;

    switch (method){
        case 'GET':
            switch (url){
                case '/pokemon/ditto':
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(dittoJSON));
                    break;
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end('Página no encontrada\n');
            }
        case 'POST':
            switch (url){
                case '/pokemon':{
                    let body = '';
                    req.on('data', chunk =>{
                        body += chunk.toString();
                    });
                    req.on('end', () => {
                        const data = JSON.parse(body);
                        console.log(data);
                        res.writeHead(200, {'Content-Type': 'application/json'});
                        data.timestamp = Date.now();
                        res.end(JSON.stringify(data));
                    });
                    break;
                }
                default:
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end('Página no encontrada\n');
            }
    }
}

const server = http.createServer(processRequest);

server.listen(1234, () => {
    console.log(`Server listening on port http://localhost:1234`);
});