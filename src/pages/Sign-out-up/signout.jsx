import { useState} from "react";

function SignOut(){

    function handler(){
        // remove the token and navigate him back to sigup(in my convenction)
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