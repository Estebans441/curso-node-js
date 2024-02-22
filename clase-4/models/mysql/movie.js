import mysql from 'mysql2/promise';

const config = {
    host : 'localhost',
    user : 'root',
    port : 3306,
    password : 'pass',
    database : 'movies_db'
}

const connection = await mysql.createConnection(config);

export class MovieModel {
    static async getAll ({ genre }){
        if(genre){
            const [genres] = await connection.query('SELECT id FROM genre WHERE LOWER(name) = ?;', [genre.toLowerCase()]);
            if(genres.length === 0) return [];

            const [{id}] = genres;

            const [movies] = await connection
            .query('SELECT movie.title, movie.year, movie.director, movie.duration, movie.poster, movie.rate, BIN_TO_UUID(movie.id) id FROM movie JOIN movie_genres ON movie.id = movie_genres.movie_id WHERE movie_genres.genre_id = ?;', id);
            return movies;
        }
        const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie;');
        return movies;
    }

    static async getById ({ id }){
        const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE BIN_TO_UUID(id) = ?;', id);
        return movies;
    }

    static async create ({ input }){
        const { title, year, director, duration, poster, rate, genre } = input;
        const [result] = await connection.query('INSERT INTO movie (title, year, director, duration, poster, rate) VALUES (?, ?, ?, ?, ?, ?);', [title, year, director, duration, poster, rate]);
        const movieId = result.insertId;
        console.log(result);
        const promises = genre.map(async g => {
            let id = 0;
            const [genres] = await connection.query('SELECT id FROM genre WHERE LOWER(name) = ?;', g.toLowerCase());
            if(genres.length === 0) {
                const [result] = await connection.query('INSERT INTO genre (name) VALUES (?);', g);
                id = result.insertId;
            }
            else id = genres[0].id;
            await connection.query('INSERT INTO movie_genres (movie_id, genre_id) VALUES (?, ?);', [movieId, id]);
        });
        await Promise.all(promises);
        return { result };
    }    

    static async delete ({ id }){
        const [result] = await connection.query('DELETE FROM movie WHERE BIN_TO_UUID(id) = ?;', id);
        return result.affectedRows > 0;
    }

    static async update ({ id, data }){
        const [movies] = await connection.query('SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id FROM movie WHERE BIN_TO_UUID(id) = ?;', id);
        
        const updatedMovie = {
            ...movies[0],
            ...data
        };

        const { title, year, director, duration, poster, rate } = updatedMovie;
        await connection.query('UPDATE movie SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ? WHERE BIN_TO_UUID(id) = ?;', [title, year, director, duration, poster, rate, id]);
        return updatedMovie;
    }
}