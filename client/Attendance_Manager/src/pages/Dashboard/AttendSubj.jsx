import { useEffect,useState } from "react";
import { useParams } from 'react-router-dom';
import DonutChart from "./doughnut";



function AttendSubj(){
    const [records,setRecords]=useState([[{}]]);   
    useEffect(()=>{
        async function GetAllRec(){
            let response= await fetch("/dashboard/attendance",{
                method:"GET"
                // here i have to pass the userName, useParams to fetch the userName
            });
            let data= await response.json();
            // need to see how is the response in this.
            console.log(data.attendance);
            setRecords(data.attendance);
            // thr data will be grouped by dates.
        }
        GetAllRec();
    },[]);
    return (
        <>
            {
                records.map((element,index)=>{
                    return (
                    <div key={index}>
                        <h3>Subject : {element.subject}</h3>
                        <DonutChart rec={[element.totalYes,element.totalNo]} percentage= {element.percentageAttended} />
                        {/* <p>Classes Attended: {element.totalYes}</p>
                        <p>Classes Missed: {element.totalNo}</p> */}
                        {/* <p>Percentage : {element.percentageAttended}</p> */}
                    </div>)
                })
            }
        </>
    )
}
export default AttendSubj;