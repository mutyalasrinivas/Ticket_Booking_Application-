import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails, newBooking } from '../../api-helpers/api-helpers';
import { Box, FormLabel, TextField, Typography,Button } from '@mui/material';

const Booking=()=>{
    const [movie,setMovie]=useState();
    const [inputs,setInputs]=useState({seatNumber:"" , date:""})
    const id=useParams().id;
     useEffect(()=>{
      getMovieDetails(id).then((res)=>setMovie(res.movie)).catch(err=>console.log(err))
    },[id])
  
    const handleChange =(e)=>{
      setInputs((prevState)=>({
        ...prevState,
        [e.target.name]:e.target.value}))
    }    

    const handleSubmit=(e)=>{
      e.preventDefault();
      newBooking({...inputs,movie:movie._id})
      .then((res)=>console.log(res))
      .catch(err=>console.log(err))
     }
  return <div> 
   { movie && <Fragment>
    <Typography
      padding={3}
      fontFamily={"fantasy"}
      variant ={"h4"}
      color={"orange"}
      textAlign={"center"}
    >
      {movie.title}
    </Typography>
    <Box display={"flex"} justifyContent={"center"}>
      <Box display={"flex"}
           justifyContent="column"
           flexDirection="column"
           paddingTop={3}
           width="50%"
           marginRight={"auto"}
                 
            >
          <img width="80%" height={"300px"} src={movie.posterUrl} alt={movie.title}/>
          <Box width="80%" marginTop={"3"} padding={"2"}>
            <Typography paddingTop={2} >{movie.description}</Typography>
            <Typography fontWeight={"bold"} paddingTop={2}>Actors: {movie.actors.map((actor)=>" "+actor+" ")}</Typography>
            <Typography fontWeight={"bold"} paddingTop={1}>Release Date:{" "+new Date(movie.releaseDate).toDateString()}</Typography>
          </Box>
      </Box>
      <Box width="50%" paddingTop={3}>
        <form onSubmit={handleSubmit}>
          <Box  display={"flex"} padding={5} margin={"auto"} flexDirection="column">
            <FormLabel>Seat Number</FormLabel>
            <TextField name="seatNumber" type={"number"} margin="normal" variant="standard" value={inputs.seatNumber} onChange={handleChange} />
            <FormLabel>Booking Date</FormLabel>
            <TextField name="date" type={"date"} margin="normal" variant="standard" value={inputs.date} onChange={handleChange}/>
            <Button type="submit" sx={{mt:3}} > Book Your Seat</Button>
          </Box>
        </form>
      </Box>
    </Box>
   </Fragment>
    
   }
 </div>
}


export default Booking;