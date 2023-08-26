import React ,{useEffect,useState} from "react";
import { getAllMovies } from "../api-helpers/api-helpers";

import {AppBar,Toolbar ,Autocomplete,TextField, Tabs,Tab} from "@mui/material";
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import {Box} from '@mui/system';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";
   const Header=()=>{
    const dispatch=useDispatch();
    const isUserLoggedIn = useSelector((state)=>state.user.isLoggedIn);
    const isAdminLoggedIn=useSelector((state)=>state.admin.isLoggedIn);
    const [value,setValue]=useState(0);
    const [movies,setMovies]=useState([]);
    useEffect(()=>{
        getAllMovies().then((data)=>setMovies(data.movies)).catch(err=>console.log(err))
    },[])
    const logout=(isAdmin)=>{
       return isAdmin?dispatch(adminActions.logout()):dispatch(userActions.logout()); 
    }
     
    return  <AppBar position="sticky" sx={{backgroundColor:"orange"}} >
        <Toolbar > 
            <Box width={'20%'}>
                <MovieCreationIcon/>
            </Box>
            <Box width={'30%'} margin={'auto'}>
            <Autocomplete 
              
              options={movies&&movies.map((option) => option.title)}
             renderInput={(params) => <TextField sx={{input:{color:"white"}}} variant="standard"{...params} placeholder="Search Your Favorite Movies" />}
            />
            </Box>
            <Box display={'flex'}>
                <Tabs textColor="inherit" indicatorColor="primary" value={value} onChange={(e,val)=>setValue(val)}>
                    <Tab LinkComponent={Link} to="/movies" label="Movies"/>
                    {!isUserLoggedIn && !isAdminLoggedIn &&(<>
                        <Tab LinkComponent={Link} to="/admin" label="Admin"/>
                        <Tab LinkComponent={Link} to="/auth" label="Auth"/>
                    </>)
                    }
                    {isUserLoggedIn&&(<>
                        <Tab LinkComponent={Link} to="/user" label="Profile"/>
                        <Tab onClick={()=>logout(false)} LinkComponent={Link} to="/" label="Logout"/>
                    </>)
                    }
                    {isAdminLoggedIn&&(<>
                    <Tab LinkComponent={Link} to="/add" label="Add Movie"/>
                    <Tab LinkComponent={Link} to="/admin" label="Profile"/>
                    <Tab onClick={()=>logout(true)} LinkComponent={Link} to="/" label="Logout"/>
                    </>)
                    }
                </Tabs>
            </Box>
        </Toolbar>
    </AppBar>
}

export default Header;