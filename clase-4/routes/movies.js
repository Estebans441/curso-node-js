import { Router } from "express";
import { readJSON } from '../utils.js';
import { validateMovie, validatePartialMovie } from '../schemas/movies.js';
import { randomUUID } from 'node:crypto';

export const moviesRouter = Router();

// Leer JSON en ESModules
// import fs from 'node:fs';
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

// Leer un JSON en ESModules recomentdado por ahora
const movies = readJSON('./movies.json');

// Todas las peliculas
moviesRouter.get('/', (req, res) => {
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

// Una pelicula por ID
moviesRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    const movie = movies.find((movie) => movie.id === id);
    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// Crear una pelicula
moviesRouter.post('/', (req, res) => {
    // Usando Zod
    const result = validateMovie(req.body);
    if(result.error) {
        return res.status(400).json({ message: result.error });
     }
     
     const newMovie = {
         id: randomUUID(),
         ...result.data
     };
 
     movies.push(newMovie); // no seria rest pero por ausencia de base de datos se hace asi
     res.status(201).json(newMovie);
 });


 // Borrar una pelicula
 moviesRouter.delete('/:id', (req, res) => {    
    const {id} = req.params;
    const movieIndex = movies.findIndex((movie) => movie.id === id);
    
    if(movieIndex === -1) {
        return res.status(404).json({ message: 'Movie not found' });
    }
    
    movies.splice(movieIndex, 1);
    
    return res.json({ message: 'Movie deleted' });
});

// Actualizar una pelicula
moviesRouter.patch('/:id', (req, res) => {
    const result = validatePartialMovie(req.body);
    
    if(!result.success) {
        return res.status(400).json({ message: result.error });
    }
    
    const {id} = req.params;
    const movieIndex = findIndex((movie) => movie.id === id);
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
