import { validateMovie, validatePartialMovie } from '../schemas/movies.js';

/**
 * Controlador de películas.
 */
export class MovieController {

    constructor({ movieModel }) {
        this.movieModel = movieModel;
    }

    /**
     * Obtiene todas las películas filtradas por género.
     */
    getAll = async (req, res) => {
        const { genre } = req.query;
        const movies = await this.movieModel.getAll({ genre });
        return res.json(movies);
    }

    /**
     * Obtiene una película por su ID.
     */
    getById = async (req, res) => {
        const id = req.params.id;
        const movie = await this.movieModel.getById({ id });
    
        if (movie) res.json(movie);
        else return res.status(404).json({ message: 'Movie not found' });
    }

    /**
     * Crea una nueva película.
     */
    create = async (req, res) => {
        const result = validateMovie(req.body);
        if(result.error) {
            return res.status(400).json({ message: result.error });
         }
         
         const newMovie = await this.movieModel.create({ input : result.data});
         if(newMovie) return res.status(201).json(newMovie);
         else return res.status(404).json({ message: 'Movie not found' });
     }

     /**
     * Elimina una película por su ID.
     */
    delete = async (req, res) => {    
        const {id} = req.params;
        const deleted = await this.movieModel.delete({ id });
    
        if (deleted) return res.json({ message: 'Movie deleted' });
        else return res.status(404).json({ message: 'Movie not found' });
    }

    /**
     * Actualiza una película por su ID.
     */
    update = async (req, res) => {
        const { id } = req.params;
        const result = validatePartialMovie(req.body);
        
        if(!result.success) return res.status(400).json({ message: result.error });
        
        const updatedMovie = await this.movieModel.update({ id : id,  data : result.data });
        return res.json(updatedMovie);
    }
}