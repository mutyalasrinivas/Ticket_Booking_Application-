import { Box, Button, Dialog, FormLabel, IconButton, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
const labelStyle={mt:1,mb:1}

const AuthForm =({onSubmit,isAdmin})=>{
    const [inputs,setInputs]=useState({
        name:"",
        email:"",
        password:"",
    });
     
    const handleChange=(e)=>{
        setInputs((prevState)=>({
            ...prevState,
          [e.target.name] : e.target.value  
        }));
    };
   
  const [isSignup,setIsSignup]=useState(false)
  const handleSubmit=(e)=>{
    e.preventDefault();
    onSubmit({inputs,signup:isAdmin?false : isSignup})
  }  
  
  return <Dialog PaperProps={{style:{borderRadius:25}}} open={true}>
    <Box sx={{ml:"auto",padding:1}}>
        <IconButton>
           <CloseRoundedIcon />
        </IconButton>
           
    </Box>
    <Typography variant="h5" textAlign={"center"} marginTop={2}>
          {isSignup ? "Signup" : "Login"}
    </Typography>
     <form onSubmit={handleSubmit}>
        <Box margin={"auto"} display={"flex"} flexDirection={"column"} justifyContent={"center"} padding={5} alignContent={"center"} width={400}  >
       
      {!isAdmin && isSignup&&<>  <FormLabel sx={labelStyle} margin="auto">Name</FormLabel>
           <TextField 
            value={inputs.name}
            onChange={handleChange}
            margin="normal" 
            type={"text"} 
            variant="standard" 
            name="name"/> 
           </> }
           <FormLabel sx={labelStyle} margin>Email</FormLabel>
           <TextField
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            type={"email"}
            variant="standard"
            name="email"/> 
           <FormLabel sx={labelStyle}>Password</FormLabel>
           <TextField 
           value={inputs.password}
           onChange={handleChange}
           margin="normal" 
           type={"password"}
            variant="standard"
             name="password"/> 
         <Button sx={{mt:2 ,borderRadius:10,bgcolor:"orange"}} type="submit" fullWidth>
                {isSignup ? "signup" : "Login"}  
            </Button>
           {!isAdmin && (<Button onClick={()=>setIsSignup(!isSignup)} sx={{mt:2 ,borderRadius:10}} fullWidth>
            Switch TO {isSignup?"Login":"Signup"}
            </Button>)}
        </Box>
     </form>
         

   
  </Dialog>
}

export default AuthForm;