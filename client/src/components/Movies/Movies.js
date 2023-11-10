import React, { useEffect ,useState} from 'react';
import { Box, Typography } from '@mui/material';
import MovieItem from './MovieItem';
import { getAllMovies } from '../../api-helpers/api-helpers';

const Movies= ()=>{
    const [movies,setMovies]=useState([]);
    useEffect(()=>{
         getAllMovies().then((data)=>setMovies(data.movies)).catch(err=>console.log(err));
    },[])
    return  <Box margin="auto" marginTop={4} padding="2">
        <Typography varient="h4" margin={"auto"} width={"20%"} padding={2} textAlign={"center"} bgcolor={"#8bdaed"} borderRadius={2} color={"white"}>
            All Movies
        </Typography>
       <Box width={"100%"} margin={"auto"} marginTop={5}  display={"flex"} justifyContent={"flex-start"} flexWrap={"wrap"}>
       {movies&&movies.map((movie)=>(
            <MovieItem  id={movie._id} releaseDate={movie.releaseDate} posterUrl={movie.posterUrl} description={movie.description}   key={movie._id}/>
        ))}
      </Box>  

     </Box>
    
}

export default Movies;


