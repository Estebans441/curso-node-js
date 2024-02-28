import { readJSON } from '../../utils.js';
import { randomUUID } from 'node:crypto';

// Leer JSON en ESModules
// import fs from 'node:fs';
// const movies = JSON.parse(fs.readFileSync('./movies.json', 'utf-8'));

// Leer un JSON en ESModules recomentdado por ahora
const movies = readJSON('./movies.json');

export class MovieModel {
    static async getAll ({genre}) {
        if(genre) {
            return movies.filter(
                movie => movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
            );
        }
        return movies;
    }

    static async getById ({id}) {
        return movies.find((movie) => movie.id === id);
    }

    static async create ({ input }) {
        const newMovie = {
            id: randomUUID(),
            ...input
        };
    
        movies.push(newMovie);

        return newMovie;
    }

    static async delete ({id}) {
        const movieIndex = movies.findIndex((movie) => movie.id === id);
        if(movieIndex === -1) return false;
        movies.splice(movieIndex, 1);
        return true;
    }

    static async update ({ id, data }) {
        const movieIndex = movies.findIndex((movie) => movie.id === id);
        if(movieIndex === -1) return false;

        const updatedMovie = {
            ...movies[movieIndex],
            ...data
        };
        movies[movieIndex] = updatedMovie;
        return updatedMovie;
    }
}