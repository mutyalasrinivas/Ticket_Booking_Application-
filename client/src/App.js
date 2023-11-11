import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import Admin from "./components/Admin/Admin";
import Movies from "./components/Movies/Movies";
import Auth from "./components/Auth/Auth";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "./store";
import Booking from "./components/Booking/Booking";
import UserProfile from "./components/Profile/UserProfile";
import AdminProfile from "./components/Profile/AdminProfile";
import AddMovie from "./components/Movies/AddMovie";

function App() {
  const dispatch = useDispatch();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  console.log("isUserLoggedIn", isUserLoggedIn);
  console.log("isAdminLoggedIn", isAdminLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, []);

  return (
    <div>
      <Header />
      <section>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminProfile />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/user" element={<UserProfile/>}  />
          <Route path="/add" element={<AddMovie/>}/>
          <Route path="/booking/:id" element={<Booking />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
