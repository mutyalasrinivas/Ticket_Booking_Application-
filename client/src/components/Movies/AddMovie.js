import React, { useEffect, useState } from "react";
import { addMovie } from "../../api-helpers/api-helpers";
import { FormLabel, TextField ,Box, Typography, Button, Checkbox} from "@mui/material";

const labelStyle= {  mt: 1,mb: 1}               

const AddMovie=()=>{
  const [inputs,setInputs]=useState({
    title: "",
    description: "",
    posterUrl: "",
    releaseDate: "",
    featured: false,
  });

  const [actors,setActors]=useState([])
  const [actor,setActor] =useState()
  const handleChange=(e)=>{
      setInputs((prevState)=>({
           ...prevState,
           [e.target.name]:e.target.value
      }))
  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    addMovie({...inputs,actors})
    .then(res=>console.log(res))
    .catch(err=>console.log(err))
  }
  return (
    <Box>
            <Box>
               <Typography 
               textAlign={"center"}
                padding={2} 
                margin={5}
                variant="h6"
                color={"white"}
                fontStyle={"bold"}
                bgcolor={"#94d6b8"}
                >
                  Add Movie
                </Typography>
               </Box>
        <form onSubmit={handleSubmit}>
            <Box width={"50%"} display={"flex"} flexDirection={"column"} padding={7} textAlign={"center"} margin="auto" boxShadow={"10px 10px 30px #ccc" }>
               <FormLabel sx={labelStyle}>Title Of Movie</FormLabel>
               <TextField value={inputs.title} name="title" variant="standard" margin="normal" onChange={handleChange} />
               <FormLabel sx={labelStyle}>Description</FormLabel>
               <TextField value={inputs.description} onChange={handleChange} variant="standard" name="description"  />
               <FormLabel sx={labelStyle}>Poster Url</FormLabel>
               <TextField variant="standard" name="posterUrl" value={inputs.posterUrl} onChange={handleChange}/>
               <FormLabel sx={labelStyle}>Release Date</FormLabel>
               <TextField type={"date"} value={inputs.releaseDate} onChange={handleChange} name="releaseDate" variant="standard" margin="normal"/>
               <FormLabel sx={labelStyle}>Actors</FormLabel>
                <Box display={"flex"}>
                  <TextField value={actor} onChange={(e)=>setActor(e.target.value)} name="actors" variant="standard" sx={{marginLeft:"37%"}}/>
                  <Button onClick={
                    ()=>{
                      setActors([...actors,actor]);
                      setActor("");
                    }}>
                    Add
                  </Button>
                </Box>
                <Box padding={3}>
                <FormLabel sx={{mr:"auto"}}>Featured</FormLabel>
                <Checkbox
                  name="featured"
                  checked={inputs.featured}
                  sx={{margin:"auto"}} 
                  onClick={(e)=>{
                    setInputs((prevState)=>({
                      ...prevState,
                      featured:e.target.checked
                    }))
                  }}
                />
                </Box >
                <Button 
                type="submit"
                variant="contained"
                sx={{
                  width:"30%",
                  margin:"auto",
                  bgcolor: "#94d6b8",
                  ":hover":{
                    bgcolor:"orange"
                  }
                }}>
                  Add New Movie
                </Button>

            </Box>
        </form>
    </Box>
  )
}

export default AddMovie;