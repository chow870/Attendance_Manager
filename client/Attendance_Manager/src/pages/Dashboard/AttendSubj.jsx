import { useEffect,useState } from "react";
import DonutChart from "./doughnut";
import { useNavigate } from "react-router-dom";



function AttendSubj(){
    const [records,setRecords]=useState([[{}]]); 
    const navigate = useNavigate();  
    useEffect(()=>{
        async function GetAllRec(){
            try{
                let response= await fetch("/dashboard/attendance",{
                    method:"GET",
                    headers: {
                        'Authorization': localStorage.getItem('token')
                      }
                });
                if(response.ok){
                    let data= await response.json();
                    console.log(data.attendance);
                    setRecords(data.attendance);

                }
                else{
                    navigate('/signin');
                }
                

            }
            catch(error){
                navigate('/dashoard');
            } 
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
                        <DonutChart rec={[element.totalYes,element.totalNo]} percentage= {Math.floor(element.percentageAttended)} />
                    </div>)
                })
            }
        </>
    )
}
export default AttendSubj;