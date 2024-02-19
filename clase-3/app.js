/* 
-------------------
*FUNDAMENTOS DE REST*
-------------------
* RECURSOS
Cada recurso se identifica con una URL única.
-
* VERBOS HTTP
Para definir la operaciones que se van a realizar sobre el recurso
-
* REPRESENTACIONES
JSON, XML, HTML, etc.
El cliente debe poder decidir la representación que desea recibir.
-
* STATELESS
Cada solicitud realizada debe contener toda la información necesaria para ser procesada.
-
* INTERFAZ UNIFORME
Interfaz consistente y uniforme para interactuar con los recursos.
-
* SEPARACION DE CONCEPTOS
Permite que cliente y servidor evolucionen de forma independiente.
*/

const express = require('express'); // require --> commonJS
const crypto = require('node:crypto');
const movies = require('./movies.json');
const {validateMovie, validatePartialMovie} = require('./schemas/movies');

const app = express();
app.disable('x-powered-by'); // Deshabilita el header X-Powered-By

app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
});

app.use(express.json()); // Middleware para parsear el body de la request

// Todos los recursos que sean movies se identifican con movies
// Todas las peliculas
app.get('/movies', (req, res) => {
    const { genre } = req.query;
    if(genre) {
        const filteredMovies = movies.filter((movie) => 
        movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase()
        ));
        res.json(filteredMovies);
        return;
    }
    res.json(movies);
});

// Pelicula por id
app.get('/movies/:id', (req, res) => {
    const id = req.params.id;
    const movie = movies.find((movie) => movie.id === id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// Crear pelicula
app.post('/movies', (req, res) => {
    /* FORMA COSTOSA
    const { title, year, director, duration, poster, genre, rate } = req.body;
    if(!title || !year || !director || !duration || !poster || !genre || !rate) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    */
   // Usando Zod
   const result = validateMovie(req.body);
   if(result.error) {
       return res.status(400).json({ message: result.error });
    }
    
    const newMovie = {
        id: crypto.randomUUID(),
        ...result.data
    };

    movies.push(newMovie); // no seria rest pero por ausencia de base de datos se hace asi
    res.status(201).json(newMovie);
});

// Actualizar pelicula
app.patch('/movies/:id', (req, res) => {
    const result = validatePartialMovie(req.body);
    
    if(!result.success) {
        return res.status(400).json({ message: result.error });
    }
    
    const {id} = req.params;
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    if(movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' });
    }

    const updatedMovie = {
        ...movies[movieIndex],
        ...result.data
    };

    movies[movieIndex] = updatedMovie;

    return res.json(updatedMovie);
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
});
