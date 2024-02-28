import express from 'express';
import logger from 'morgan'; // logger a nivel de request para express
import dotenv from 'dotenv';

dotenv.config();

import { createClient } from '@libsql/client';

import { Server } from 'socket.io';
import { createServer } from 'node:http';

const port  = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {connectionStateRecovery: {timeout: 1000}});

// Crear un cliente de base de datos
const db = createClient({
    url: 'libsql://real-time-chat-estebans441.turso.io',
    authToken: process.env.DB_TOKEN
});
// Conectar el cliente a la base de datos
await db.execute('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, user TEXT)');

// Manejar la conexión de un cliente
io.on('connection', async (socket) => {
    // Obtener el nombre de usuario del cliente
    const username = socket.handshake.auth.username;
    console.log(`User ${username} connected`);
    
    // Si el cliente se desconecta
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    // Manejar el evento de mensaje enviado
    socket.on('chat message', async (msg) => {
        let result;
        try{
            result = await db.execute({
                sql: 'INSERT INTO messages (content, user) VALUES (:msg, :username)',
                args: { msg, username }
            });
        } catch (error) {
            console.error(error);
            return;
        }
        io.emit('chat message', msg, result.lastInsertRowid.toString(), username);
    });

    if(!socket.recovered){
        try{
            const results = await db.execute({
                sql: 'SELECT * FROM messages WHERE id > :id',
                args: { id: socket.handshake.auth.serverOffset ?? 0 }
            });

            results.rows.forEach(row => {
                socket.emit('chat message', row.content, row.id.toString(), row.user);
            });
        } catch (error) {
            console.error(error);
            return;
        }
    }
});

app.use(logger('dev'));

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/client/index.html');
});

server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});