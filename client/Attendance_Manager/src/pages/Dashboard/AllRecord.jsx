import { useEffect,useState } from "react";
import { useParams } from 'react-router-dom';


function AllRecords(){
    const [records,setRecords]=useState([]);  
    useEffect(()=>{
        console.log("reached here");
        async function GetAllRec(){
            let response= await fetch("/dashboard/allrecords",{
                method:"GET"
                // here i have to pass the userName, useParams to fetch the userName
            });
            let data= await response.json();
            // need to see how is the response in this.
            console.log(data.recs);
            setRecords(data.recs);
            // thr data will be grouped by dates.
        }
        GetAllRec();

    },[]);
    return (
        <>
            {   // itself an array 
                records.map((element,index)=>{
                    return (
                    <div key={index}>
                        <h3>{element.date}</h3>
                        {element.records.map((ele,ind)=>{
                            // each ele is itself an object
                            return (
                            <div  key={ind} >                               
                            {/* try to add the color wala effect in this */}
                                <p>Subject: {ele.subject}</p>
                                <p>Credit :{ele.credit}</p>
                                <p>Professor :{ele.professor}</p>
                                <p>Venue : {ele.venue}</p>
                                <p>Status :{ele.status}</p>

                            </div>)
                        })}  
                    </div>)
                })
            }
        </>
            )
}

export default AllRecords;

/*
    Schema for the data retriveal.

    Array/object[
        object{
            date:"",
            Record:Array[
                object{
                    className:
                    timing:
                    proffes
                    venue:
                    status:
                },
                object{},
                object{}
            ]
        },
        object{},
        object{}
    ]



*/