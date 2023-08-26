import React from "react";
import AuthForm from "./AuthForm";
import { userAuth } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { userActions } from "../../store";
const Auth=()=>{
    const dispatch=useDispatch();
    const onResReceived=(data)=>{
        console.log("onResReceived",data);
        dispatch(userActions.login());
        localStorage.setItem("userId",data.id);
    };
    const getData=(data)=>{
        console.log("user",data)
        userAuth(data.inputs,data.signup)
        .then(onResReceived)
        .catch(err=>console.log(err));
    }
    return (
       <div>
          <AuthForm onSubmit={getData} isAdmin={false}/>
        </div>
    );
};

export default Auth;