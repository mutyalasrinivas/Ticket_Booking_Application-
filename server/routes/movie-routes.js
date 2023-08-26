import express from'express';
const movieRouter=express.Router();
import { addMovie ,getAllMovies,getMovieById} from '../controllers/movie-controller.js';

movieRouter.get('/',getAllMovies)
movieRouter.post('/',addMovie)
movieRouter.get('/:id',getMovieById)





export default movieRouter;