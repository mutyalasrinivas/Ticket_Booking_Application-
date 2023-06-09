import express from'express';
const movieRouter=express.Router();
import { addMovie ,getAllMovies} from '../controllers/movie-controller.js';

movieRouter.get('/',getAllMovies)
movieRouter.post('/',addMovie)






export default movieRouter;