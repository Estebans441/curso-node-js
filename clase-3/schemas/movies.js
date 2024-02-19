const z = require('zod');

// ZOD: libreria para validacion de esquemas
// npm install zod -c
const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required'
    }),
    year: z.number().int().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    poster: z.string().url({
        invalid_url_error: 'Poster must be a valid URL',
    }),
    genre: z.array(
        z.enum(['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-fi', 'Mafia', 'Crime'])
    ),
    rate: z.number().min(0).max(10).optional(),
});

function validateMovie(object) {
    return movieSchema.safeParse(object);
}

function validatePartialMovie(object) {
    return movieSchema.partial().safeParse(object);
}

module.exports = {
    validateMovie,
    validatePartialMovie
};