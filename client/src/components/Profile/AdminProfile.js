import React, { Fragment, useEffect, useState } from "react";
import { getBookingsOfUser, getUserDetails ,deleteBooking,getAdminDetails,deleteMovie} from "../../api-helpers/api-helpers";
import { Box, ListItem, ListItemText, Typography ,List, IconButton,DeleteForverIcon} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
 const AdminProfile= ()=>{
     
    const [admin,setAdmin]=useState();
      
   useEffect(()=>{
      getAdminDetails().then((res)=>setAdmin(res.admin)).catch(err=>console.log(err));
   },[admin])
     const handleDelete=(id)=>{
        deleteMovie(id)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
    }
    
     return (
    <Box width={"100%"} display={"flex"}>
      <Fragment>
        {" "}
     {admin&&(<Box  width={"30%"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
        <Typography
          padding={1}
          width={"auto"}
          borderRadius={5}
          textAlign={"center"}
          variant="h6"
          margin={3}
          border={"1px solid #ccc"}>
          {admin.email}
        </Typography>
      </Box>)}
     {admin && admin.addedMovies.length>0 && (
     <Box width={"70%"}>
       <Typography variant="h4" textAlign={"center"} fontFamily={"Fantasy"} color={"orange"}  padding={3}  >
        Added Movies List
       </Typography>
       <Box width="80%" margin={"auto"} display={"flex"} flexDirection={"column"}>
         <List>
          
          {admin.addedMovies.map((movie)=>(
              <ListItem sx={{color:"white",bgcolor:"#94d6b8",textAlign:"center",margin:1}}>   
                <ListItemText sx={{margin:1,width:"auto",textAlign:"left"}}>
                   <div>
                      Movie:<br/>
                      {movie.title}    
                    </div> 
                </ListItemText>
                <ListItemText sx={{margin:1,width:"auto",textAlign:"left"}}>
                  <div> Description :<br/>{movie.description}</div>
                </ListItemText>
                <ListItemText sx={{margin:1,width:"auto",textAlign:"left"}}>
                  <div>Release Date :<br/> {new Date(movie.releaseDate).toDateString()}</div>
                </ListItemText>
                <IconButton
                    onClick={()=>handleDelete(movie._id)} 
                    color="error"   >
                  <DeleteIcon/>
                </IconButton>
             </ListItem>
          ))}
           
         </List>
       </Box>
     </Box>)}
      </Fragment>
  
       
    </Box>)
}

export default AdminProfile;