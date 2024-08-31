import { useEffect,useState } from "react";
import { useParams } from 'react-router-dom';


function MissedClasses(){
    const {records,setRecords}=useState([[{}]]);   
    const {subject,setSubject}=useState([]);
    const {startDate,setstartDate}=useState("");
    const {endDate,setendDate}=useState("");

    useEffect(()=>{
        // here write to fetch all the subjects.
        

    },[]);
    
    async function submitHandler(event){
        
        event.preventDefault();
         const timestamp = Date.now();
         const date = new Date(timestamp).toISOString();
         const seDate= date.split('T')[0];
         var options = document.getElementById('subject').selectedOptions;
         var values = Array.from(options).map(({ value }) => value);
         console.log(values);

         
         let formData={
            username:"Aditya Choudhary",
            sDate: startDate.length==0 ? seDate: startDate,
            eDate: endDate.length==0 ? seDate: endDate,
            subjects:values
         };

       
       
        //  TODO : add the userName from the token available in the localHost.

        console.log(formData);
        try{
            let response =await fetch("",{
            method:"GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(formData)
            });
            console.log("object created");
            let data= response.json();
            await setRecords(data.rec);
            console.log("record updated");
        }
        catch{
            console.log("some Error Has occured while creation")

        }
        // so that i can fetch the new updated schedule and apply green or red color when rendered later.
        
}
    return (
        <>
            <form onSubmit={submitHandler} id="myform" key="myform">
                <label>Date start:</label>
                <input type="date"  id="dateStart"
                    value={startDate}
                    onChange={(event)=>{
                        setstartDate(event.target.value);
                    }}
                    
                />
                <label > Date end :</label>
                <input type="date"  id="dateEnd"
                    value={endDate}
                    onChange={(event)=>{
                        setendDate(event.target.value);
                    }}
                    
                />
                <label> Subjects : </label>
                <select name="subjects" id="subject" multiple>
                    {subject.map((element)=>{
                        return (
                            <option value= {`${element}`} >{element}</option>
                        )
                    })}
                </select>
                <input type="submit" value="Submit"/>
            </form>

            {
                records.length ?
                records.map((element,index)=>{
                    <div key={index}>
                        <h3>Here will come the subject : {element.subject}</h3>
                        {element.records.map((ele,ind)=>{
                            // each ele is itself an object
                            <div key={ind} >                               
                            {/* try to add the color wala effect in this */}
                                <p>Date: {ele.date}</p>
                                <p>Time: {ele.time}</p>
                                <p>Credit :{ele.credit}</p>
                                <p>Professor :{ele.professor}</p>
                                <p>Venue : {ele.venue}</p>
                                <p>Status :{ele.status}</p>

                            </div>
                        })}  
                    </div>
                    

                }) :<> </>
            }
        </>
    )
}
export default MissedClasses;