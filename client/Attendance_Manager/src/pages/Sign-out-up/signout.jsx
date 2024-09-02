import { useState} from "react";

function SignOut(){

    function handler(){
        // remove the token and navigate him back to sigup(in my convenction)
        console.log("reached in Signout Handler")
        if(localStorage.getItem('token')==null){
            console.log("no token exists")
            return ;
        }
        // implies that we have to destroy then token.
        localStorage.removeItem('token');
        // useNavigate() now.
    }
    return (
        <>
        <button type="submit" onSubmit={handler}>LOGOUT</button>
        </>
    )

}

export default SignOut;