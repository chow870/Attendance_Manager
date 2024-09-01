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
        <MainDashboard Today_classes={Today_classes} setToday_classes={setToday_classes} Tom_classes={Tom_classes} Yest_classes={Yest_classes}/>
    )
    
    

}

export default Dashboard;