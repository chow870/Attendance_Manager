import { useEffect,useState } from "react";
import { useParams } from 'react-router-dom';


function AllRecords(){
    const {records,setRecords}=useState([[{}]]);   
    useEffect(()=>{
        async function GetAllRec(){
            let response= await fetch("URL",{
                method:"GET"
                // here i have to pass the userName, useParams to fetch the userName
            });
            let data= response.json();
            // need to see how is the response in this.
            setRecords(data);
            // thr data will be grouped by dates.
        }

    },[]);
    return (
        <>
            {
                records.map((element,index)=>{
                    <div key={index} 
                    className={element.status=="yes"? "":""}  >
                        <h3>HERE WILL COME THE DATE {element.date}</h3>
                        <></>
                        <></>
                        <></>
                        <></>
                        <br></br>
                    </div>
                    

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