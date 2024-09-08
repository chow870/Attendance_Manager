import { useState,useEffect } from "react";
import "/home/chow228/Desktop/DEV/Attendance_Manager2/client/Attendance_Manager/src/cssClasses/greenred.css";
import { Link, Outlet } from 'react-router-dom';

function MainDashboard({Today_classes,setToday_classes,Yest_classes,Tom_classes}){
    

    async function submitHandler(event){
        
            event.preventDefault();
            const formElement = event.target;
            // username actually will be received from the token/ authKey.
            // Get the ID of the form.
           
            const formId = formElement.id;
            const index= formId.split(':')[1];
            const timestamp = Date.now();
            const date = new Date(timestamp).toISOString();
            const arr= date.split('T');
            // updating the css 
            const status= document.getElementById(`${index}status`).value;
            const div = document.getElementById(`${index}`);
            status=="Yes"? div.classList.add("light-green") : div.classList.add("light-red");

             let formData={
                username:"Aditya ",
                subject: document.getElementById(`${index}subject`).textContent,
                credit: document.getElementById(`${index}credit`).textContent,
                professor: document.getElementById(`${index}proffesor`).textContent,
                time: document.getElementById(`${index}time`).textContent,
                venue: document.getElementById(`${index}venue`).textContent,
                status:document.getElementById(`${index}status`).value,
                date:arr[0]
             };

           
           
            //  TODO : add the userName from the token available in the localHost.

            console.log(formData);
            try{
                await fetch("/dashboard/submit",{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(formData)
                });
                console.log("object created");
                // await SetToday_class();
            }
            catch{
                console.log("some Error Has occured while creation")

            }
            // so that i can fetch the new updated schedule and apply green or red color when rendered later.
            
    }
    
    return(
        <> 
            {/* for today wala done hai */}
            <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="text-white text-lg font-bold">
          <Link to="/">
            {/* Replace this text with an actual logo image */}
            <span>Company Logo</span>
          </Link>
        </div>
        
        {/* Navigation Links */}
        <ul className="flex space-x-4 text-white">
          <li>
            <Link
              to="/allrecords"
              className="hover:text-gray-300 transition duration-200"
            >
              All Records
            </Link>
          </li>
          <li>
            <Link
              to="/attendancesubj"
              className="hover:text-gray-300 transition duration-200"
            >
              Attendance Subj
            </Link>
          </li>
          <li>
            <Link
              to="/missedclasses"
              className="hover:text-gray-300 transition duration-200"
            >
              Missed Classes
            </Link>
          </li>
        </ul>
      </div>
    </nav>
                {/* <Outlet/> */}

               

        </>
    )

}

export default MainDashboard;