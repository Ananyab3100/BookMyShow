import express from 'express';
import { addMovie } from '../controllers/movie-controller.js';
import { getAllMovies } from '../controllers/movie-controller.js';
import { getMovieById } from '../controllers/movie-controller.js';

const movieRouter = express.Router();

movieRouter.post("/", addMovie);
movieRouter.get("/", getAllMovies);
movieRouter.get("/:id", getMovieById);

export default movieRouter;

