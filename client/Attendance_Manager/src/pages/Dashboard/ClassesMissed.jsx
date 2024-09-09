import { useEffect,useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';


function MissedClasses(){
    const [records,setRecords]=useState([]);   
    const [subject,setSubject]=useState(["PHYSICS "]);
    const [startDate,setstartDate]=useState("");
    const [endDate,setendDate]=useState("");
    const navigate= useNavigate();

    // useEffect(()=>{
    //     // here write to fetch all the subjects.
        

    // },[]);
    
    async function submitHandler(event){
        
        event.preventDefault();
         const timestamp = Date.now();
         const date = new Date(timestamp).toISOString();
         const seDate= date.split('T')[0];
         var options = document.getElementById('subject').selectedOptions;
         var values = Array.from(options).map(({ value }) => value);
         console.log(values);

         
         let formData={
            sDate: startDate.length == 0 ? seDate: startDate,
            eDate: endDate.length == 0 ? seDate: endDate,
            subjects:values
         };

        console.log("the form data is : ");
        console.log(formData);
        let selectedSubjectsString = encodeURIComponent(JSON.stringify(formData.subjects));
        try{
            let response =await fetch(`/dashboard/classesMissed?sdate=${formData.sDate}&edate=${formData.eDate}&selectedSubjects=${selectedSubjectsString}`,{
            method:"GET",
  
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': localStorage.getItem('token')
              }
            });
            if(response.ok){
                console.log("object created");
                let data= await response.json();
                setRecords(data.rec);
                console.log("record updated");

            }
            else{
                navigate('/signin');
            }
          
        }
        catch(error){
            console.log("some Error Has occured while creation",error);
            navigate('/dashboard');

        }
       
        
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
                    {subject.map((element,index)=>{
                        return (
                            <option key={index} value= {`${element}`} >{element}</option>
                        )
                    })}
                </select>
                <input type="submit"/>
            </form>

            {
                records.length ?
                records.map((element,index)=>{
                    return (
                    <div key={index}>
                        <h3>Here will come the subject : {element.subject}</h3>
                        {element.records.map((ele,ind)=>{
                            // each ele is itself an object
                            return (
                            <div key = {`${ind}`} >                               
                            {/* try to add the color wala effect in this */}
                                <p>Date: {ele.date}</p>
                                <p>Time: {ele.time}</p>
                                <p>Credit :{ele.credit}</p>
                                <p>Professor :{ele.professor}</p>
                                <p>Venue : {ele.venue}</p>
                                <p>Status :{ele.status}</p>

                            </div>)
                        })}  
                    </div>)
                }) :<> </>
            }
        </>
    )
}
export default MissedClasses;