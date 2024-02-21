import { MovieModel } from '../models/mysql/movie.js';
import { validateMovie, validatePartialMovie } from '../schemas/movies.js';

/**
 * Controlador de películas.
 */
export class MovieController {
    /**
     * Obtiene todas las películas filtradas por género.
     */
    static async getAll (req, res) {
        const { genre } = req.query;
        const movies = await MovieModel.getAll({ genre });
        return res.json(movies);
    }

    /**
     * Obtiene una película por su ID.
     */
    static async getById (req, res) {
        const id = req.params.id;
        const movie = await MovieModel.getById({ id });
    
        if (movie) res.json(movie);
        else return res.status(404).json({ message: 'Movie not found' });
    }

    /**
     * Crea una nueva película.
     */
    static async create (req, res) {
        const result = validateMovie(req.body);
        if(result.error) {
            return res.status(400).json({ message: result.error });
         }
         
         const newMovie = await MovieModel.create({ input : result.data});
         if(newMovie) return res.status(201).json(newMovie);
         else return res.status(404).json({ message: 'Movie not found' });
     }

     /**
     * Elimina una película por su ID.
     */
     static async delete (req, res) {    
        const {id} = req.params;
        const deleted = await MovieModel.delete({ id });
    
        if (deleted) return res.json({ message: 'Movie deleted' });
        else return res.status(404).json({ message: 'Movie not found' });
    }

    /**
     * Actualiza una película por su ID.
     */
    static async update (req, res) {
        const { id } = req.params;
        const result = validatePartialMovie(req.body);
        
        if(!result.success) return res.status(400).json({ message: result.error });
        
        const updatedMovie = await MovieModel.update({ id : id,  data : result.data });
        return res.json(updatedMovie);
    }
}