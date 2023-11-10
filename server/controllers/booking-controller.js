import Bookings from "../models/Bookings.js"
import Movie from "../models/Movie.js";
import User from "../models/User.js";
import mongoose from "mongoose";
export const newBooking=async(req,res,next)=>{
     const {movie,date,seatNumber,user}=req.body;
     let existingMovie;
     let existingUser;
     try{
         existingMovie=await Movie.findById(movie);
         existingUser=await User.findById(user);
     }catch(err){
        console.log(err);
     }
     if(!existingMovie){
        return res.status(404).json({message:"Movie Not found"});
     }
     if(!existingUser){
        return res.status(404).json({message:"User Not found"});
     }
     
     let booking;
     try{
         booking=new Bookings({movie,date:new Date(`${date}`),seatNumber,user})
         const session=await mongoose.startSession();
         session.startTransaction();
         existingUser.bookings.push(booking);
         existingMovie.bookings.push(booking);
         
         await existingUser.save({session});
         await existingMovie.save({session});
         await booking.save({session});
         await  session.commitTransaction();

     }catch(err){
        console.log(err);
     }
     if(!booking){
        return res.status(500).json({message:"something went wrong"})
     }
     return res.status(200).json({booking});
}

export const getBookingById=async(req,res,next)=>{
    const id=req.params.id;
    let booking;
    try{
          booking=await Bookings.findById(id)
    }catch(err){
        console.log(err);
    }
    if(!booking){
        return res.status(500).json({message:"something went wrong"})
    }
    res.status(200).json({booking})
}

export const deleteBooking =async(req,res,next)=>{
    const id=req.params.id;
    let booking;
    try{
    
        booking=await Bookings.findByIdAndRemove(id).populate("user movie") 
        const session=await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.movie.bookings.pull(booking)
        await booking.movie.save({session});
        await booking.user.save({session});
        session.commitTransaction();

    }catch(err){
        console.log(err);
    }
    if(!booking){
        return res.status(500).json({message:"something went wrong"})
    }
    return res.status(200).json({message:"successfully deleted"})
}