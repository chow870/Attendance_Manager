import { useState,useEffect } from "react";

function Tschedule({Today_classes}){

    async function submitHandler(event){
        
            event.preventDefault();
            const form= document.getElementById("myform");
            const formData= new FormData(form);
           
            // TODO : add the userName from the token available in the localHost.

            console.log(formData);
            try{
                let resp1=await fetch("http://localhost:3000/todo",{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(formData)
                });
                console.log("object created");

                // now updating the changes so that Reacts triggers Re-rendering
                let resp= await fetch("http://localhost:3000/todo",{
                method:"GET",
                headers: {
                    'Content-Type': 'application/json'
                }
                })
                console.log(resp);
                let data=await resp.json();
                SetTodos(data.todo);
            }
            catch{
                console.log("some Error Has occured while creation")

            }


    }
    return(
        <>
            <form id ="myForm" onSubmit={submitHandler()}>
                    {Today_classes.forEach((element)=> {
                        // array of objects
                        <div>
                            <p>here will come name of class</p>
                            <p>time</p>
                            <p>venue</p>
                            <p>proffesor</p>
                            <p>credit</p>
                            <label for="status">Did You attend the class ?</label>
                            <input type="checkbox"  name="status" value="Yes"/>
                            <input type="checkbox"  name="status" value="No"/>
        
                        </div>
                        
                    })
                    }
                    <input type="submit" />
            </form>
        </>
    )

}

export default Tschedule;