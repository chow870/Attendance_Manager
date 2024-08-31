import { useEffect,useState } from "react";
import { useParams } from 'react-router-dom';


function AttendSubj(){
    const {records,setRecords}=useState([[{}]]);   
    useEffect(()=>{
        async function GetAllRec(){
            let response= await fetch("URL",{
                method:"GET"
                // here i have to pass the userName, useParams to fetch the userName
            });
            let data= response.json();
            // need to see how is the response in this.
            setRecords(data.attendance);
            // thr data will be grouped by dates.
        }
        GetAllRec();
    },[]);
    return (
        <>
            {
                records.map((element,index)=>{
                    <div key={index}>
                        <h3>Here will come the subject : {element.subject}</h3>
                        <p>Classes Attended: {element.totalYes}</p>
                        <p>Classes Missed: {element.totalNo}</p>
                        <p>Percentage : {element.percentageAttended}</p>
                    </div>
                })
            }
        </>
    )
}
export default AttendSubj;