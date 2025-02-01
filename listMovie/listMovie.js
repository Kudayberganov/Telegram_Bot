const Movie = require("../models/Movie");

async function getAllMovies() {
    const movies = await Movie.find();
    console.log(movies);
}

getAllMovies();
