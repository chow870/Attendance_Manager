import React, { useState, useEffect } from 'react';
import MainDashboard from "./MainDashBoard";

function Dashboard(){
    const [Today_classes, setToday_classes]=useState([]);
    const [Yest_classes, setYest_classes]=useState([]);
    const [Tom_classes, setTom_classes]=useState([]);
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    // still you have to pass the token here to the validation and other purposes.
    useEffect(()=>{
        const d = new Date();
        async function fetchTheClassesToday(){
            let day = weekday[d.getDay()];
            console.log(day);
            let response= await fetch(`/schedule/today?day=${day}`,{
                    method :"GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                }
            )
            if(response.ok){
                console.log("the response of today fetch was : ",response)
                let data= await response.json(); // check how is data being sent by the Api.
                console.log(data);
                 setToday_classes(data.result);
            }
            // setToday_classes(["hey there"]);
            console.log("now error here")
            
        }
        async function fetchTheClassesYest(){
            let d2 = d.getDay()>0 ? d.getDay()-1 : 6;
            let day = weekday[d2];
            console.log(day);
            let response= await fetch(`/schedule/Yesterday?day=${day}`,{
                    method :"GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                }
            )
            if(response.ok){
            console.log("the response of Yesterday fetch was : ",response)   
            let data= await response.json(); // check how is data being sent by the Api.
            console.log(data);
             setYest_classes(data.result);}
        }
        async function fetchTheClassesTom(){
            let day = weekday[(d.getDay()+1)%7];
            console.log(day);
            let response= await fetch(`/schedule/Tomorrow?day=${day}`,{
                    method :"GET",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                      },
                }
            )
            if(response.ok){
            console.log("the response of Tomorrow fetch was : ",response)
            let data= await response.json(); // check how is data being sent by the Api.
            console.log(data);
             setTom_classes(data.result);
        }
        }
        fetchTheClassesToday();
        fetchTheClassesYest();
        fetchTheClassesTom();

    },[]);
    return (
        <>


<MainDashboard Today_classes={Today_classes} setToday_classes={setToday_classes} Tom_classes={Tom_classes} Yest_classes={Yest_classes}/>
       

       
         <div className="p-8 space-y-4">
      {/* Today's classes */}
      <h2 className="text-xl font-bold mb-4">Today</h2>
      {Today_classes.map((element, index) => (
        <form
          id={`myform:${index}`}
          key={`myform:${index}`}
          onSubmit={(e) => submitHandler(index, e)}
          className={`p-4 rounded-lg shadow-lg transition-all transform hover:-rotate-3 hover:shadow-2xl bg-[#c084fc] text-black`}
        >
          <div
            className={`p-4 rounded-lg ${element.status === 'Yes' ? 'bg-green-400' :element.status === 'No' ? 'bg-red-400' : ''}`}
          >
            <p>Subject: {element.subject}</p>
            <p>Credit: {element.credit}</p>
            <p>Professor: {element.professor}</p>
            <p>Time: {element.time}</p>
            <p>Venue: {element.venue}</p>

            {element.status === 'NULL' && (
              <>
                <label htmlFor={`status-${index}`}>Did You attend the class?</label>
                <select id={`status-${index}`} name="status" className="ml-2 p-1">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <input type="submit" className="ml-4 p-1 bg-blue-500 text-white rounded" />
              </>
            )}
          </div>
        </form>
      ))}

      <div className="flex justify-between space-x-4 mt-8">
        {/* Yesterday's classes */}
        <div className="w-1/2">
          <h3 className="text-xl font-bold mb-4">Yesterday</h3>
          {Yest_classes.map((element, index) => (
            <div
              id={`yest-${index}`}
              key={index}
              className={`p-4 rounded-lg shadow-lg transition-all transform hover:-rotate-3 hover:shadow-2xl ${element.status === 'Yes' ? 'bg-green-400' : element.status === 'No' ? 'bg-red-200' : 'bg-[#fbcfe8]'}`}
            >
              <p>Subject: {element.subject}</p>
              <p>Credit: {element.credit}</p>
              <p>Professor: {element.professor}</p>
              <p>Time: {element.time}</p>
              <p>Venue: {element.venue}</p>
            </div>
          ))}
        </div>

        {/* Tomorrow's classes */}
        <div className="w-1/2">
          <h3 className="text-xl font-bold mb-4">Tomorrow</h3>
          {Tom_classes.map((element, index) => (
            <div
              id={`tom-${index}`}
              key={index}
              className="p-4 rounded-lg shadow-lg transition-all transform hover:-rotate-3 hover:shadow-2xl bg-[#f0abfc]"
            >
              <p>Subject: {element.subject}</p>
              <p>Credit: {element.credit}</p>
              <p>Professor: {element.professor}</p>
              <p>Time: {element.time}</p>
              <p>Venue: {element.venue}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
         </>
       
    )
    
    

}

export default Dashboard;