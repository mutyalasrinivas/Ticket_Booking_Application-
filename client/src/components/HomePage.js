import { Box, Typography,Button} from "@mui/material";
import React, { useEffect,useState } from "react";
import MovieItem from "./Movies/MovieItem";
import { Link } from "react-router-dom";
import { getAllMovies } from "../api-helpers/api-helpers";

const HomePage=()=>{
    const [movies,setMovies]=useState([])
    useEffect(()=>{
        getAllMovies().then((data)=>setMovies(data.movies)).catch(err=>console.log(err))
    },[])
     console.log(movies)
    return <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2} >
        <Box margin={"auto"} width={"90%"} height={"40vh"} padding={2} >
           <img src="https://www.goldderby.com/wp-content/uploads/2022/12/RRR.jpg"
            alt="RRR"
            width={"100%"}
            height={"100%"}/>
        </Box>
        <Box padding={5} margin={"auto"}>
          <Typography variant={"h4"} textAlign={"center"} color={"orange"}>Latest Releases</Typography>
        </Box>
        <Box margin={"auto"} display="flex" width="80%" justifyContent={"center"} alignItems="center" flexWrap="wrap">
            {movies&&movies.slice(0,4).map((movie)=>(
                <MovieItem id={movie._id} title={movie.title} releaseDate={movie.releaseDate} posterUrl={movie.posterUrl} description={movie.description} key={movie.id}/>
            ))}
            
        </Box>
        <Box display={"flex"}  padding={5} margin={"auto"}>
           <Button LinkComponent={Link} to="/movies" variant="outlined"   sx={{margin:"auto",color:"orange"}}>All Movies</Button>
        </Box>
    </Box>
}

export default HomePage;