import { getTrendingMovie } from '../controller/movies.controller.js';
import { getMovieTrailers } from '../controller/movies.controller.js';
import { getMovieDetails } from '../controller/movies.controller.js';
import { getSimilarMovies } from '../controller/movies.controller.js';
import { getMoviesByCategory } from '../controller/movies.controller.js';
import express from 'express';
const router = express.Router();

router.get("/trending",getTrendingMovie)
router.get("/:id/trailers",getMovieTrailers)
router.get("/:id/details",getMovieDetails)
router.get("/:id/similar",getSimilarMovies)
router.get("/:category",getMoviesByCategory)
export default router;