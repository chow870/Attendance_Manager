import { useState,useEffect } from "react";

function MainDashboard({Today_classes,setToday_classes,Yest_classes,Tom_classes}){

    async function SetToday_class() {
        try {
            const resp = await fetch("url", { method: "GET" });
            const data = await resp.json();
            setToday_classes(data);
        } catch (error) {
            console.error("Failed to fetch today's classes:", error);
        }
    }

    async function submitHandler(event){
        
            event.preventDefault();
            const formElement = event.target;
            // username actually will be received from the token/ authKey.
            // Get the ID of the form
             const formId = formElement.id;
             const index= formId.split(':')[1];
             let formData={
                username:"Aditya Choudhary",
                subject: document.getElementById(`${index}subject`).textContent,
                credit: document.getElementById(`${index}credit`).textContent,
                proffesor: document.getElementById(`${index}proffesor`).textContent,
                time: document.getElementById(`${index}time`).textContent,
                venue: document.getElementById(`${index}venue`).textContent,
                status:document.getElementById(`${index}status`).value
             };

           
           
            //  TODO : add the userName from the token available in the localHost.

            console.log(formData);
            try{
                await fetch("",{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(formData)
                });
                console.log("object created");
                await SetToday_class();
            }
            catch{
                console.log("some Error Has occured while creation")

            }
            // so that i can fetch the new updated schedule and apply green or red color when rendered later.
            
    }
    return(
        <> 
            {/* for today wala done hai */}
            
                    {Today_classes.map((element,index)=> {
                        // array of objects
                        <form id ={`myform:${index}`} key ={`myform:${index}`} onSubmit={submitHandler}>
                                    <div id={`${index}`} key={index} 
                                    // appropriate classes to be applied for this .
                                        className={element.status=="Yes"? "": element.status=="No" ? "":""}
                                    >
                                        <p id={`${index}subject`}>{element.subject}</p>
                                        <p id={`${index}credit`}>{element.credit}</p>
                                        <p id={`${index}proffesor`}>{element.proffesor}</p>
                                        <p id={`${index}time`}>{element.time} </p>
                                        <p id={`${index}venue`}>{element.venue}</p>
                                
                                        {element.status == "NULL" ? (
                                                <>
                                                    <label htmlFor="status">Did You attend the class?</label>
                                                    <select id={`${index}status`} name="status">
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                    </select>
                                                </>) : null
                                        }
                        </div>
                    </form>
                        
                    })
                    }
                    
           
            <div>
                <div >
                {Yest_classes.map((element,index)=> {
                        // array of objects
                        <div id={index} 
                            className={element.status=="yes"? "":""} // here apply the css 
                        >
                            <p>Subject Name :</p>
                            <p>credit</p>
                            <p>proffesor</p>
                            <p>time : </p>
                            <p>venue</p>
                        </div>
                        
                    })
                    }
                    
                </div>
                <div>
                {Tom_classes.map((element,index)=> {
                        // array of objects
                        <div id={index}>
                            <p>Subject Name :</p>
                            <p>credit</p>
                            <p>proffesor</p>
                            <p>time : </p>
                            <p>venue</p>
                            
                        </div>
                        
                    })
                    }
                </div>
            </div>

        </>
    )

}

export default MainDashboard;