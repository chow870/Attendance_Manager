import { useState,useEffect } from "react";
function SignupForm(){
    const {username,setUsername}=useState("");
    const {password,setPassword}=useState("");
    async function handler(){
        let response= await fetch("",{
            method:"GET",
            headers: {
                "Content-Type": "application/json"
              },
            body:JSON.stringify({username:username,password:password})
        });
        let data= await response.json();
        // now bring the token back :)


    }


return (
   
    <>
    <input
        type="text"
        placeholder="Enter Your UserName"
        value={username}
        onChange={(event)=>{
            setUsername(event.target.value);
        }
            
        }
    />
    <input
        type="password"
        placeholder="Enter Your Password "
        value={password}
        onChange={(event)=>{
            setPassword(event.target.value);
        }}
        
        
    />
    <button type="button" onClick={handler}> Submit </button>
    
    </>
)
}
