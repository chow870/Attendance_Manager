import { useState} from "react";
import { useNavigate } from "react-router-dom";

function SignOut(){
    const navigate =useNavigate();
    function handler(){
        console.log("reached in Signout Handler")
        if(localStorage.getItem('token')==null){
            console.log("no token exists")
            return ;
        }
        // implies that we have to destroy then token.
        localStorage.removeItem('token');
        navigate('/signin');
    }
    return (
        <>
        <button type="submit" onSubmit={handler}>LOGOUT</button>
        </>
    )
}

export default SignOut;