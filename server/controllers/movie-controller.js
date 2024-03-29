 import jwt from 'jsonwebtoken';
 import Movie from '../models/Movie.js'
 import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Admin from '../models/Admin.js';
 dotenv.config()
 
 export const addMovie = async(req,res,next)=>{
    const extractedToken=req.headers.authorization.split(" ")[1];
    if(!extractedToken&&extractedToken.trim()===""){
        return res.status(404).json({message:"Token Not Found"})
    }
    console.log(extractedToken)
    let adminId;
    //verify
     jwt.verify(extractedToken,process.env.SECRET_KEY,(err,decrypted)=>{
        if(err){
            return res.status(400).json({message:`${err.message}`})
        }else{
            adminId=decrypted.id;
        }
        return;
     })
    //create a movie....
    console.log(req.body)
    const {title,description,releaseDate,posterUrl,featured,actors} =req.body;
    console.log(title)
    if(!title&&title.trim()===""&&
        !description&&description.trim()===""&&
        !posterUrl&&posterUrl.trim()===""
    ){
        return res.status(422).json({message:"Invalid Inputs"})
    }
    let movie
    try{
       movie = new Movie({title,description,releaseDate:new Date(`${releaseDate}`),actors,posterUrl,featured,admin:adminId})
       const session=await mongoose.startSession();
       let adminUser=await Admin.findById(adminId);
       session.startTransaction();
       await movie.save({session});
       adminUser.addedMovies.push(movie);
       await adminUser.save({session})
       await session.commitTransaction();
    }catch(err){
        console.log(err);
    }
    if(!movie){
        return res.status(500).json({message:"something went wrong"})
    }
    return res.status(200).json({movie})

 }

 export const getAllMovies=async(req,res,next)=>{
   
   let movies;
    try{
      movies=await Movie.find()
    }catch(err){
        console.log(err);
    }
    if(!movies){
        return res.status(500).json({message:"somethig went wrong"})
    }
    return res.status(200).json({movies});
 }

 export const getMovieById=async(req,res,next)=>{
    const id=req.params.id;
    let movie;
    try{
        movie=await Movie.findById(id);
        console.log(movie)
    }catch(err){
        console.log(err);
    }

    if(!movie){
        return res.status(500).json({message:"something went wrong"});
    }
    return res.status(200).json({movie});
 }
 
 export const deleteMovie=async(req,res,next)=>{
    const id=req.params.id;
    let movie;
    try{
        movie=await Movie.findByIdAndRemove(id).populate("admin bookings");
        const session= await mongoose.startSession();
        session.startTransaction();
        await movie.admin.addedMovies.pull(movie)
        await movie.bookings.pull(movie)
        await movie.admin.save({session})
         session.commitTransaction();
         
    }catch(err){
        console.log(err);
    }
    if(!movie){
         return res.status(500).json({message:"movie not deleted"})   
    }
    return res.status(200).json({message:"successfully deleted"})
 }