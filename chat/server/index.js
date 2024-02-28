import express from 'express';
import logger from 'morgan'; // logger a nivel de request para express

import { Server } from 'socket.io';
import { createServer } from 'node:http';

const port  = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {connectionStateRecovery: {timeout: 1000}});

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
});

app.use(logger('dev'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});