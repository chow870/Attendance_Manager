import { useEffect,useState } from "react";
import { useParams } from 'react-router-dom';


function MissedClasses(){
    const {records,setRecords}=useState([[{}]]);   
    const {subject,setSubject}=useState([]);
    useEffect(()=>{
        // here write to fetch all the subjects.
        

    },[]);
    async function handler(){
        
    }
    return (
        <>
            <form onSubmit={handler} id="myform" key="myform">
                <label>Date start:</label>
                <input type="date"  name="dateStart"/>
                <label > Date end :</label>
                <input type="date"  name="dateEnd"/>
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
                        {element.rec.map((ele,ind)=>{
                            <div key={index} 
                            className={element.status=="yes"? "":""}>
                                <h3>HERE WILL COME THE DATE {element.date}</h3>
                                <></>
                                <></>
                                <></>
                                <></>
                                <br></br>
                            </div>

                        })}

                    </div>
                    

                }) :<> </>
            }
        </>
    )
}
export default MissedClasses;