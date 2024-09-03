import { useState,useEffect } from "react";
import "/home/chow228/Desktop/DEV/Attendance_Manager2/client/Attendance_Manager/src/cssClasses/greenred.css";
import { Link, Outlet } from 'react-router-dom';

function MainDashboard({Today_classes,setToday_classes,Yest_classes,Tom_classes}){
    

    async function submitHandler(event){
        
            event.preventDefault();
            const formElement = event.target;
            // username actually will be received from the token/ authKey.
            // Get the ID of the form.
           
            const formId = formElement.id;
            const index= formId.split(':')[1];
            const timestamp = Date.now();
            const date = new Date(timestamp).toISOString();
            const arr= date.split('T');
            // updating the css 
            const status= document.getElementById(`${index}status`).value;
            const div = document.getElementById(`${index}`);
            status=="Yes"? div.classList.add("light-green") : div.classList.add("light-red");

             let formData={
                username:"Aditya ",
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
                await fetch("/dashboard/submit",{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(formData)
                });
                console.log("object created");
                // await SetToday_class();
            }
            catch{
                console.log("some Error Has occured while creation")

            }
            // so that i can fetch the new updated schedule and apply green or red color when rendered later.
            
    }
    
    return(
        <> 
            {/* for today wala done hai */}
                <nav>
                        <ul>
                            <li><Link to="/dashboard/allrecords">AllRecords</Link></li>
                            <li><Link to="/dashboard/attendancesubj">Attendance Subj</Link></li>
                            <li><Link to="/dashboard/missedclasses">Missed Classes</Link></li>
                        </ul>
                </nav>
                <Outlet/>

                    <h3>Today</h3>
                    {Today_classes.map((element,index)=> {
                        // array of objects
                        return (
                        <form id ={`myform:${index}`} key ={`myform:${index}`} onSubmit={submitHandler}>
                                    <div id={`${index}`} key={index} 
                                    // appropriate classes to be applied for this .
                                    // className={element.status=="Yes"? "": element.status=="No" ? "":""}
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
                                        <input type="submit"/>
                        </div>
                        
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