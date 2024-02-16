const net = require('node:net');

function findAvailablePort (desired){
    return new Promise((resolve, reject) => {
        const server = net.createServer();
        
        server.listen(desired, () => {
            const { port } = server.address();
            server.close(() => {
                resolve(port);
            });
        });

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                findAvailablePort(desired + 1).then(port => resolve(port));
            } else {
                reject(err);
            }
        });
    });
}

module.exports = { findAvailablePort };