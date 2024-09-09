import { useEffect,useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';


function AllRecords(){
    const [records,setRecords]=useState([]);  
    const navigate = useNavigate();
    useEffect(()=>{
        console.log("reached here");
        
            async function GetAllRec(){
                try{
                let response= await fetch("/dashboard/allrecords",{
                    method:"GET",
                    headers: {
                        'Authorization': localStorage.getItem('token')
                      }
                });
                if(response.ok){
                    let data= await response.json();
                    console.log(data.recs);
                    setRecords(data.recs);
                }
                else{
                    navigate('/signin');

                }
            }
            catch(error){
                navigate('/dashboard');

            }
        }
        GetAllRec();

    },[]);
    return (
        <>
            {   // itself an array 
                records.map((element,index)=>{
                    return (
                    <div key={index} >
                        <h3>{element.date}</h3>
                        {element.records.map((ele,ind)=>{
                            // each ele is itself an object
                            return (
                                <div
                                    key={ind}
                                    className="mb-2 text-l font-bold tracking-tight text-black bg-[#fecaca] p-4 rounded-lg shadow-lg hover:bg-gray-700 hover:shadow-2xl hover:-translate-y-2 hover:rotate-x-4 transform transition-all duration-300 hover:scale-105"
                                    style={{ perspective: '1000px',  overflow: 'hidden',transformOrigin: 'center',}} // To create the 3D flip effect
                                    >
                                    <p className="hover:text-white hover:text-shadow-glow">Subject: {ele.subject}</p>
                                    <p className="hover:text-white hover:text-shadow-glow">Credit: {ele.credit}</p>
                                    <p className="hover:text-white hover:text-shadow-glow">Professor: {ele.professor}</p>
                                    <p className="hover:text-white hover:text-shadow-glow">Venue: {ele.venue}</p>
                                    <p className="hover:text-white hover:text-shadow-glow">Status: {ele.status}</p>
                                    </div>


                            
                            )
                        })}  
                    </div>
                    )
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