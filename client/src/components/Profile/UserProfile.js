import React, { Fragment, useEffect, useState } from "react";
import { getBookingsOfUser, getUserDetails ,deleteBooking} from "../../api-helpers/api-helpers";
import { Box, ListItem, ListItemText, Typography ,List, IconButton,DeleteForverIcon} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
 const UserProfile= ()=>{
    const [bookings,setBookings]=useState();
    const [user,setUser]=useState();
     
   useEffect(()=>{
     getBookingsOfUser().then((res)=>setBookings(res.bookings)).catch(err=>console.log(err));
     getUserDetails().then((res)=>setUser(res.user)).catch(err=>console.log(err));
   },[bookings])

    const handleDelete=(id)=>{
        deleteBooking(id)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err));
    }
    
     return (
    <Box width={"100%"} display={"flex"}>
      <Fragment>
        {" "}
     {user&&(<Box  width={"30%"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"}>
         <Typography 
        border={"1px solid #ccc"}
        padding={1}
        width={"auto"}
        borderRadius={5}
        textAlign={"center"}
        variant="h6"
        marginTop={15}
         
        >
        Name:{user.name}
        </Typography>
        <Typography
          padding={1}
          width={"auto"}
          borderRadius={5}
          textAlign={"center"}
          variant="h6"
          margin={3}
          border={"1px solid #ccc"}>
          {user.email}
        </Typography>
      </Box>)}
     {bookings&& (
     <Box width={"70%"}>
       <Typography variant="h4" textAlign={"center"} fontFamily={"Fantasy"} color={"orange"}  padding={3}  >
        Bookings
       </Typography>
       <Box width="80%" margin={"auto"} display={"flex"} flexDirection={"column"}>
         <List>
          
          {bookings.map((booking)=>(
              <ListItem sx={{color:"white",bgcolor:"#94d6b8",textAlign:"center",margin:1}}>   
                <ListItemText sx={{margin:1,width:"auto",textAlign:"left"}}>
                   <div>
                      Movie:<br/>
                      {booking.movie.title}    
                    </div> 
                </ListItemText>
                <ListItemText sx={{margin:1,width:"auto",textAlign:"left"}}>
                  <div>Seat Number :<br/>{booking.seatNumber}</div>
                </ListItemText>
                <ListItemText sx={{margin:1,width:"auto",textAlign:"left"}}>
                  <div>Date :<br/> {new Date(booking.date).toDateString()}</div>
                </ListItemText>
                <IconButton
                    onClick={()=>handleDelete(booking._id)} 
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

export default UserProfile;