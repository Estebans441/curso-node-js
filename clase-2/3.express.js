const express = require('express');
const app = express();

const PORT = process.env.PORT ?? 1234;

// GET
app.get('/pokemon/ditto', (req, res) => {
    const dittoJSON = require('./pokemon/ditto.json');
    res.status(200).json(dittoJSON);
});

app.get('/', (req, res) => {
    res.send('<h1>Hello World</h1>');
});


// POST
app.post('/pokemon', (req, res) => {
    let body = '';
    req.on('data', chunk =>{
        body += chunk.toString();
    });

    req.on('end', () => {
        const data = JSON.parse(body);
        data.timestamp = Date.now();
        res.status(201).json(data);
    });
})

// LISTEN
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});