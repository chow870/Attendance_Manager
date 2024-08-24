import { useState,useEffect } from "react";

function Dashboard(){
    const {Today_classes, setToday_classes}=useState([]);
    const {Yest_classes, setYest_classes}=useState([]);
    const {Tom_classes, setTom_classes}=useState([]);
    useEffect(()=>{
        async function fetchTheClassesToday(){
            let response= await fetch("",
                {
                    method :"GET"
                }
            )
            let data= response.json(); // check how is data being sent by the Api.
            setToday_classes(data);
        }
        async function fetchTheClassesYest(){
            let response= await fetch("",
                {
                    method :"GET"
                }
            )
            let data= response.json(); // check how is data being sent by the Api.
            setYest_classes(data);
        }
        async function fetchTheClassesTom(){
            let response= await fetch("",
                {
                    method :"GET"
                }
            )
            let data= response.json(); // check how is data being sent by the Api.
            setTom_classes(data);
        }
        fetchTheClassesToday();
        fetchTheClassesYest();
        fetchTheClassesTom();

    },[]);
    
    

}

export default Dashboard;