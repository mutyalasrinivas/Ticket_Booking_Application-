 import jwt from 'jsonwebtoken';
 import Movie from '../models/Movie.js'
 import dotenv from 'dotenv';
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
       movie=await movie.save();
    }catch(err){
        console.log(err);
    }
    if(!movie){
        return res.status(500).json({message:"something went wrong"})
    }
    return res.status(200).json({movie})

 }

 