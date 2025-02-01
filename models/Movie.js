const mongoose = require("../db");

const MovieSchema = new mongoose.Schema({
    code: { type: String, required: true },
    title: { type: String, required: true },
    year: String,
    genre: String
});

const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
