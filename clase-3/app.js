const express = require('express'); // require --> commonJS

const app = express();
app.disable('x-powered-by'); // Deshabilita el header X-Powered-By

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});

