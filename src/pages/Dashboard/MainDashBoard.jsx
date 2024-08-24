import { useState,useEffect } from "react";

function MainDashboard({Today_classes,Yest_classes,Tom_classes}){

    async function submitHandler(event){
        
            event.preventDefault();
            const form= document.getElementById("myform");
            const formData= new FormData(form);
           
            //  TODO : add the userName from the token available in the localHost.

            console.log(formData);
            try{
                let resp1=await fetch("",{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(formData)
                });
                console.log("object created");
            }
            catch{
                console.log("some Error Has occured while creation")

            }


    }
    return(
        <> 
            {/* for today wala done hai */}
            <form id ="myForm" onSubmit={submitHandler()}>
                    {Today_classes.map((element,index)=> {
                        // array of objects
                        <div id={index}>
                            <p>here will come name of class</p>
                            <p>time</p>
                            <p>venue</p>
                            <p>proffesor</p>
                            <p>credit</p>
                            <label for="status">Did You attend the class ?</label>
                            <input type="checkbox"  name="status" value="Yes"
                                onChange={()=>{
                                    // here have to attach a css to make it turn green 
                                }}
                            />
                            <input type="checkbox"  name="status" value="No"
                                onChange={()=>{
                                    // here have to attach a css to make it turn mild red.
                                }}/>
        
                        </div>
                        
                    })
                    }
                    <input type="submit" />
            </form>
            <div>
                <div id="Yesterday">
                {Yest_classes.map((element,index)=> {
                        // array of objects
                        <div id={index} 
                            className={element.status=="yes"? "":""} // here apply the css 
                        >
                            <p>here will come name of class</p>
                            <p>time</p>
                            <p>venue</p>
                            <p>proffesor</p>
                            <p>credit</p>
                            <label for="status">Did You attend the class ?</label>
                        </div>
                        
                    })
                    }
                    
                </div>
                <div id="Tomorrow">
                {Tom_classes.map((element,index)=> {
                        // array of objects
                        <div id={index}>
                            <p>here will come name of class</p>
                            <p>time</p>
                            <p>venue</p>
                            <p>proffesor</p>
                            <p>credit</p>
                            <label for="status">Did You attend the class ?</label>
                            <input type="checkbox"  name="status" value="Yes"
                                onChange={()=>{
                                    // here have to attach a css to make it turn green 
                                }}
                            />
                            <input type="checkbox"  name="status" value="No"
                                onChange={()=>{
                                    // here have to attach a css to make it turn mild red.
                                }}/>
        
                        </div>
                        
                    })
                    }
                </div>
            </div>

        </>
    )

}

export default MainDashboard;