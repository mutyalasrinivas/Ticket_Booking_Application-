import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../../api-helpers/api-helpers';

const Booking=()=>{
    const [movie,setMovie]=useState();
    const id=useParams().id;
    console.log(id)
    useEffect(()=>{
      getMovieDetails(id).then((res)=>setMovie(res.movie)).catch(err=>console.log(err))
    },[id])
    console.log(movie,"movie");
 return <div>Booking</div>
}


export default Booking;