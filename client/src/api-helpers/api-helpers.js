import axios from "axios";
import Booking from "../components/Booking/Booking";

export const getAllMovies = async () => {
  try {
    const res = await axios.get("/movie").catch((err) => console.log(err));
    console.log(res);

    if (res.status !== 200) {
      return console.log("No Movies ");
    }

    const data = await res.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const userAuth = async (data, signup) => {
  const res = await axios
    .post(`/user/${signup ? "signup" : "login"}`, {
      name: signup ? data.name : "",
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    console.log("something went wrong and bad req");
  }

  const resData = await res.data;
  return resData;
};

export const adminAuth = async (data) => {
  const res = await axios
    .post("/admin/login", {
      email: data.email,
      password: data.password,
    })
    .catch((err) => console.log(err));

  if (res.status !== 200) {
    return console.log("something went wrong unable to admin login");
  }

  const resData = await res.data;
  return resData;
};

export const getMovieDetails = async (id) => {
  const res = await axios.get(`/movie/${id}`).catch((err) => {
    console.log(err);
  });
  if (res.status !== 200) {
    return console.log("something went wrong");
  }
  const resData = await res.data;
  return resData;
};

export const newBooking=async(data)=>{
     const res= await axios.post('/booking',{
      movie:data.movie,
      seatNumber:data.seatNumber,
      date:data.date,
      user:localStorage.getItem("userId")
     }).catch(err=>console.log(err))

     if(res.status!==200){
      return console.log("something went wrong  in newbooking");
     }
     const resData=await res.data;
     console.log(resData)
     return resData;
     
}

export const getBookingsOfUser=async ()=>{
  const id=localStorage.getItem("userId")
  const res= await axios.get(`/user/bookings/${id}`).catch(err=>console.log(err))
  if(res.status!==200){
    return console.log("something went wrong in getbookings of user")
  }
  const resData=res.data;
  return resData;
}

export const getUserDetails=async()=>{
  try{
    const id=localStorage.getItem("userId");
    const res= await axios.get(`/user/${id}`)
    if(res.status!==200){
      return console.log("user not found")
    }
    const resData=await res.data
    return resData;
  }catch(err){
    console.log(err)
  }
     
}

export const getAdminDetails=async()=>{
    try{
      const id=localStorage.getItem("adminId");
      const res=await axios.get(`/admin/${id}`)
      if(res.status!==200){
        return res.send.json({message:"something went wrong"})
      }
      const resData=await res.data
      return resData;
    }catch(err){
      console.log(err);
    }
}

export const deleteMovie =async(id)=>{
  try{
    const res= await axios.delete(`/movie/${id}`)
    if(res.status!==200){
      return console.log("unable to delete movie!!!")
    }
    const resData=await res.data;
    return resData;
  }catch(err){
    console.log(err);
  }
  
}


export const deleteBooking=async(id)=>{
   const res= await axios.delete(`/booking/${id}`)
              .catch((err)=>console.log(err))

      if(res.status!==200){
        return console.log("something went wrong")
      }
      const resData=await res.data
      return resData;
}

export const addMovie =async (data)=>{
  // title,description,releaseDate,posterUrl,featured,actors
   const id=localStorage.getItem("adminId")
    
   const res= await axios.post('/movie',{
    title:data.title,
    description:data.description,
    releaseDate:data.releaseDate,
    posterUrl:data.posterUrl,
    featured:data.featured,
    actors:data.actors,
    admin:localStorage.getItem("adminId")
   },{
     headers:{
      Authorization:`Bearer ${localStorage.getItem("token")}`,
     },
   }).catch((err)=>{console.log(err)})
    if(res.status!==200){
      return console.log("somenthing went wrong in addmovie")
    }
    const resData=await res.data;
    return resData;
}