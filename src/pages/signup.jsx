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
        if(response && response.ok){
            const data= await response.json();
            localStorage.setItem('token', data.token);
            // navigate to dashboard.

        }
        else{
            if(response && response.status==400){
                // navigate to sigin page plz/ new user
            }
           else{
            // generate an alert to refresh the page
           }
        }
        
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
