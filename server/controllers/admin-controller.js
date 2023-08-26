import Admin from '../models/Admin.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const addAdmin=async(req,res,next)=>{
    const {email,password}=req.body;
    if(
       !email&&
       email.trim()===""&&
       !password&&
       password.trim()===""){
          res.status(422).json({message:"Invalid Inputs"})
       }
      let existingAdmin;
      try{
          existingAdmin=await Admin.findOne({email})
      }catch(err){
        console.log(err);
      }
       if(existingAdmin){
        return res.status(400).json({message:"admin already existed"})
       }
        let admin;
         try{
          const hashedPassword=bcrypt.hashSync(password);
          admin = new Admin({email,password:hashedPassword})
          admin= await admin.save();
        }catch(err){
            console.log(err);
        }
        if(!admin){
            return res.status(500).json({message:"something went wrong"})
        }
        return res.status(200).json({admin});
}

export const adminLogin =async(req,res,next)=>{
    const {email,password}=req.body;
    if(
       !email&&
       email.trim()===""&&
       !password&&
       password.trim()===""){
          res.status(422).json({message:"Invalid Inputs"})
       }
       let existingAdmin;
    try{
        existingAdmin=await Admin.findOne({email})
    }catch(err){
        console.log(err);
    }
    if(!existingAdmin){
        return res.status(404).json({message:"user not found"});
    }
    const matchPassword=bcrypt.compareSync(password,existingAdmin.password)
    const token=jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,{expiresIn:'7d'})
    if(!matchPassword){
        return res.status(401).json({message:"Invalid password"});
    }
    return res.status(200).json({message:"successfully loggedIn",token,id:existingAdmin._id})
    
}

export const getAdmins=async(req,res,next)=>{
     
    let admins;
    try{
        admins=await Admin.find()
      }catch(err){
        console.log(err);
    }
    if(!admins){
        return res.status(500).json({message:'something went wrong'})
    }
    return res.status(200).json({admins})
}