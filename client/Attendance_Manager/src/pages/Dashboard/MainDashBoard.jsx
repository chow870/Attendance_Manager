import { useState,useEffect } from "react";

function MainDashboard({Today_classes,setToday_classes,Yest_classes,Tom_classes}){
    useEffect(()=>{
        console.log("today's class : ",Today_classes);
        console.log("yesterday's class : ",Yest_classes);
        console.log("tomorrow's class : ",Tom_classes);
    },[])

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
             const timestamp = Date.now();
             const date = new Date(timestamp).toISOString();
             const arr= date.split('T');
             let formData={
                username:"Aditya Choudhary",
                subject: document.getElementById(`${index}subject`).textContent,
                credit: document.getElementById(`${index}credit`).textContent,
                professor: document.getElementById(`${index}proffesor`).textContent,
                time: document.getElementById(`${index}time`).textContent,
                venue: document.getElementById(`${index}venue`).textContent,
                status:document.getElementById(`${index}status`).value,
                date:arr[0]
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
                    <h3>Today</h3>
                    {Today_classes.map((element,index)=> {
                        // array of objects
                        return (
                        <form id ={`myform:${index}`} key ={`myform:${index}`} onSubmit={submitHandler}>
                                    <div id={`${index}`} key={index} 
                                    // appropriate classes to be applied for this .
                                    // className={element.status=="Yes"? "": element.status=="No" ? "":""}
                                    >
                                        <p id={`${index}subject`}>Subject :{element.subject}</p>
                                        <p id={`${index}credit`}>Credit :{element.credit}</p>
                                        <p id={`${index}proffesor`}>Proffesor :{element.proffesor}</p>
                                        <p id={`${index}time`}>Time :{element.time} </p>
                                        <p id={`${index}venue`}>Venue :{element.venue}</p>
                                
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
                        <input type="submit"/>
                    </form>)
                        
                    })
                    }
                    
           
            <div>
                <div >
                <h3>Yesterday</h3>
                {Yest_classes.map((element,index)=> {
                        // array of objects
                        return (
                        <div id={index} key={index} 
                            className={element.status=="yes"? "":""}  >
                            <p >Subject :{element.subject}</p>
                            <p >Credit :{element.credit}</p>
                            <p >Proffesor :{element.proffesor}</p>
                            <p >Time :{element.time} </p>
                            <p >Venue :{element.venue}</p>
                        </div>)
                        
                    })
                    }
                    
                </div>
                <div>
                <h3>Tomorrow</h3>
                {Tom_classes.map((element,index)=> {
                        // array of objects
                        return (
                        <div id={index} key={index} >
                           <p >Subject :{element.subject}</p>
                            <p >Credit :{element.credit}</p>
                            <p >Proffesor :{element.proffesor}</p>
                            <p >Time :{element.time} </p>
                            <p >Venue :{element.venue}</p>
                            
                        </div>)
                        
                    })
                    }
                </div>
            </div>

        </>
    )

}

export default MainDashboard;