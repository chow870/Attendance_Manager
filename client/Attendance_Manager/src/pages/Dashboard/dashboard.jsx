import React, { useState, useEffect } from 'react';
import MainDashboard from "./MainDashBoard";

function Dashboard(){
    const [Today_classes, setToday_classes]=useState([]);
    const [Yest_classes, setYest_classes]=useState([]);
    const [Tom_classes, setTom_classes]=useState([]);
    useEffect(()=>{
        async function fetchTheClassesToday(){
            let response= await fetch("/schedule/today",
                {
                    method :"GET"
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
            let response= await fetch("/schedule/Yesterday",
                {
                    method :"GET"
                }
            )
            if(response.ok){
            console.log("the response of Yesterday fetch was : ",response)   
            let data= await response.json(); // check how is data being sent by the Api.
            console.log(data);
             setYest_classes(data.result);}
        }
        async function fetchTheClassesTom(){
            let response= await fetch("/schedule/Tomorrow",
                {
                    method :"GET"
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