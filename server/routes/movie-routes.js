import express from'express';
const movieRouter=express.Router();
import { addMovie ,getAllMovies,getMovieById,deleteMovie} from '../controllers/movie-controller.js';

movieRouter.get('/',getAllMovies)
movieRouter.post('/',addMovie)
movieRouter.get('/:id',getMovieById)
movieRouter.delete('/:id',deleteMovie)





export default movieRouter;