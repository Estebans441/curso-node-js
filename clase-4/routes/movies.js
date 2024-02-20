import { Router } from "express";
import { validateMovie, validatePartialMovie } from '../schemas/movies.js';
import { MovieModel } from "../models/movie.js";

export const moviesRouter = Router();

// Todas las peliculas
moviesRouter.get('/', async (req, res) => {
    const { genre } = req.query;
    const movies = await MovieModel.getAll({ genre });
    return res.json(movies);
});

// Una pelicula por ID
moviesRouter.get('/:id', async (req, res) => {
    const id = req.params.id;
    const movie = await MovieModel.getById({ id });

    if (movie) res.json(movie);
    else return res.status(404).json({ message: 'Movie not found' });
});

// Crear una pelicula
moviesRouter.post('/', async (req, res) => {
    // Usando Zod
    const result = validateMovie(req.body);
    if(result.error) {
        return res.status(400).json({ message: result.error });
     }
     
     const newMovie = await MovieModel.create({ input : result.data});
     if(newMovie) return res.status(201).json(newMovie);
     else return res.status(404).json({ message: 'Movie not found' });
 });


 // Borrar una pelicula
 moviesRouter.delete('/:id', async (req, res) => {    
    const {id} = req.params;
    const deleted = await MovieModel.delete({ id });

    if (deleted) return res.json({ message: 'Movie deleted' });
    else return res.status(404).json({ message: 'Movie not found' });
});

// Actualizar una pelicula
moviesRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const result = validatePartialMovie(req.body);
    
    if(!result.success) return res.status(400).json({ message: result.error });
    
    const updatedMovie = await MovieModel.update({ id : id,  data : result.data });
    return res.json(updatedMovie);
});
