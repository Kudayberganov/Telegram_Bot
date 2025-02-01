const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Movie = require("../models/Movie");

const app = express();
app.use(cors());

mongoose.connect("mongodb+srv://otkir:otkir1507@mycluster.jcpu2.mongodb.net/?retryWrites=true&w=majority&appName=myCluster", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get("/movies", async (req, res) => {
    try {
        const movies = await Movie.find();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Ошибка сервера" });
    }
});

app.use(express.static("public"));

app.listen(3000, () => console.log("Сервер запущен на порту 3000"));
