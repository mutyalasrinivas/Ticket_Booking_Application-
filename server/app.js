 
import express from 'express';
import mongoose from 'mongoose';
import dotenv from'dotenv';
import userRouter from './routes/user-routes.js'
import adminRouter from './routes/admin-routes.js';
import movieRouter from './routes/movie-routes.js';
 
dotenv.config();
  

const app=express();

//middlewares
app.use(express.json());
app.use("/user",userRouter);
app.use('/admin',adminRouter)
app.use('/movie',movieRouter)


 

mongoose.connect(`mongodb+srv://sri:${process.env.MONGODB_PASSWORD}@cluster0.zvprghd.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>app.listen(4000,()=>{
    console.log("server running on 4000")
}) )
.catch(e=>console.log(e));

 