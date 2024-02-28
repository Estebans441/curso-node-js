import express, { json } from 'express'; // require --> commonJS
import { createMovieRouter } from './routes/movies.js';
import { corsMiddleware } from './middlewares/cors.js';

export const createApp = ({ movieModel }) => {
    const app = express();
    app.disable('x-powered-by'); // Deshabilita el header X-Powered-By

    // npx servor ./web

    // Middlewares
    app.use(json());
    app.use(corsMiddleware());

    // Peliculas
    app.use('/movies', createMovieRouter({ movieModel }));


    const PORT = process.env.PORT ?? 1234;
    app.listen(PORT, () => {
        console.log(`Server listening on port http://localhost:${PORT}`);
    });
}