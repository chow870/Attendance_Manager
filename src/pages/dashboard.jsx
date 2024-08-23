import { useState,useEffect } from "react";

function Dashboard(){
    const {Today_classes, setToday_classes}=useState([]);
    useEffect(()=>{
        async function fetchTheClasses(){
            let response= await fetch("",
                {
                    method :"GET"
                }
            )
            let data= response.json(); // check how is data being sent by the Api.
            setToday_classes(data);
        }
        fetchTheClasses();
    },[]);
    

}

export default Dashboard;