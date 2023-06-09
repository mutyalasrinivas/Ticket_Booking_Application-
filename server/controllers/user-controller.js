import User from '../models/User.js';
import bcrypt from 'bcryptjs';
export const getAllUsers=async (req,res,next)=>{
     let users;
     try{
        users=await User.find()
     }
     catch(err){
        return console.log(err);
     }
     if(!users){
       return res.status(500).json({message:"internal server error"});
     }

     return res.status(200).json({users});
}

export const signup=async(req,res,next)=>{
    
   const {name,email,password}=req.body;
   if(
      !name&&
      name.trim()===""&&
      !email&&
      email.trim()===""&&
      !password&&
      password.trim()===""){
         res.status(422).json({message:"Invalid Inputs"})
      }
      let user;
   try{
       const hassedPassword = bcrypt.hashSync(password)
       user= new User({name,email,password:hassedPassword})
      //  let exist=User.findOne({user});
      //  if(exist){
      //    return res.status(401).json({message:"user already existed"})
      //  }
       user=await user.save();
   }catch(err){
      return console.log(err);
   }
   if(!user){
     return res.status(500).json({message:"internal server error"})
   }
  return res.status(201).json({user});
} 

export const updateUser = async(req,res,next)=>{
       const id=req.params.id
        
   const {name,email,password}=req.body;
   if(
      !name&&
      name.trim()===""&&
      !email&&
      email.trim()===""&&
      !password&&
      password.trim()===""){
         res.status(422).json({message:"Invalid Inputs"})
      }
      const hasedPassword=bcrypt.hashSync(password)
        let user;
   try{
        user= await User.findByIdAndUpdate(id,{name,email,password:hasedPassword})
   }
   catch(err){
      console.log(err);
   }
   if(!user){
      return res.status(500).json({message:"something went wrong"})
   }
   return res.status(200).json({message:"successfully updated"})
}
export const deleteUser=async(req,res,next)=>{
   const id=req.params.id;
   let user;
   try{
        user=await User.findByIdAndRemove(id)
   }
   catch(err){
      console.log(err);
   }
   if(!user){
      return res.status(500).json({message:"something went wrong"})
   }
   return res.status(200).json({message:"successfuly deleted"})
}

export const login=async(req,res,next)=>{
   const {email,password}=req.body;
   if(
      !email&&
      email.trim()===""&&
      !password&&
      password.trim()===""){
         res.status(422).json({message:"Invalid Inputs"})
      }
      let existingUser;
      try{
        existingUser=await User.findOne({email:email})
      }catch(err){
         console.log(err);
      }
      if(!existingUser){
         return res.status(404).json({message:"user not found"});
      }
      const matchPassword =bcrypt.compareSync(password,existingUser.password)
      if(!matchPassword){
         return res.status(400).json({message:"Incorect password"})
      } 
      return res.status(200).json({existingUser,message:"succesfully logedin"})
}