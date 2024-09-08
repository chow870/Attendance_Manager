import { useState,useEffect } from "react";
import SignOut from "./signout";
function SignupForm(){
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    async function handler(){
        let response= await fetch("/signup",{
            method:"POST",
            headers: {
                "Content-Type": "application/json"
              },
            body:JSON.stringify({username:username,password:password})
        });
        if(response && response.ok){
            const data= await response.json();
            localStorage.setItem('token', data.token);
            // navigate to dashboard.
            alert("Navigate to the Dashboard");

        }
        else{
            if(response && response.status==400){
                // navigate to sigin page plz/ new user
                 alert("New User. Navigating to the New User Page");
            }
           else{
            // generate an alert to refresh the page
            alert("Something Went Wrong, Plz Refresh the Page")
           }
        }
        
    }

return (
   
    <>
   
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-white w-72 h-72 p-6 rounded-lg shadow-lg backdrop-blur-sm">
        <h2 className="text-center text-2xl font-bold mb-4">Sign In</h2>
        <input
          type="text"
          placeholder="Enter Your UserName"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="button"
          onClick={handler}
          className="w-full p-2 bg-black text-white rounded hover:bg-gray-800 transition duration-200"
        >
          Submit
        </button>
      </div>
    </div>
    <SignOut/>
    
    </>
)
}
export default SignupForm;