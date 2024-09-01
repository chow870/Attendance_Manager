const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Record = require('/home/chow228/Desktop/DEV/Attendance_Manager2/server/Model/Records_Model.cjs');
const Users = require('/home/chow228/Desktop/DEV/Attendance_Manager2/server/Model/Users_Model.cjs');
const UsersCred = require('/home/chow228/Desktop/DEV/Attendance_Manager2/server/Model/UsersCred.cjs');

const app = express(); // Initialize Express app
// mongoose.set('debug', true);
// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(bodyParser.json()); // Parse application/json
app.use(bodyParser.urlencoded({ extended: true })); // Parse application/x-www-form-urlencoded

// Database Connection
mongoose.connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));


app.get("/dashboard/allrecords",async (req,res)=>{
    // here i am supposed to give all the records, grouped by the "date" and hide the username, sort in decreasing fashion by date
    // you have to give the username for this purpose.
    console.log("reached the backend of all records");
    let username="Aditya ";
    async function getRecordsByUsername(username) {
        try {
            const records = await Record.aggregate([
                
                { $match: { username: username } },
                
            
                { 
                    $group: {
                        _id: "$date", // Group by date
                        records: {
                            $push: {
                                subject: "$subject",
                                credit: "$credit",
                                professor: "$professor",
                                time: "$time",
                                venue: "$venue",
                                status: "$status"
                            }
                        }
                    }
                },
    
                
                { $sort: { _id: -1 } },
    
               
                {
                    $project: {
                        _id: 0,
                        date: "$_id",
                        records: 1
                    }
                }
            ]);
    
            console.log(records);
            return res.json({
                "recs":records
            });
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    await getRecordsByUsername(username);


})

app.get("/dashboard/attendance",async (req,res)=>{
    // here i am supposed to give all the records, grouped by the "date" and hide the username, sort in decreasing fashion by date
    // you have to give the username for this purpose.
    let username="Aditya ";
    async function getAttendanceByUsername(username) {
        try {
            const attendance = await Record.aggregate([
                // Match documents with the specified username
                { $match: { username: username, status: { $ne: "Null" } } },
    
                // Group by subject and calculate counts for "Yes" and "No"
                {
                    $group: {
                        _id: "$subject", // Group by subject
                        totalYes: {
                            $sum: {
                                $cond: [{ $eq: ["$status", "Yes"] }, 1, 0]
                            }
                        },
                        totalNo: {
                            $sum: {
                                $cond: [{ $eq: ["$status", "No"] }, 1, 0]
                            }
                        },
                        totalClasses: { $sum: 1 } 
                    }
                },
    
               
                {
                    $project: {
                        _id: 0,
                        subject: "$_id",
                        totalYes: 1,
                        totalNo: 1,
                        percentageAttended: {
                            $cond: {
                                if: { $eq: ["$totalClasses", 0] },
                                then: 0,
                                else: {
                                    $multiply: [
                                        { $divide: ["$totalYes", "$totalClasses"] },
                                        100
                                    ]
                                }
                            }
                        }
                    }
                }
            ]);
    
            console.log(attendance);
            return res.json({
                attendance
            });
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

    await getAttendanceByUsername(username);


})

app.get("/dashboard/classesMissed",async(req,res)=>{
    let {sdate,edate,selectedSubject}=req.query;
    console.log(sdate, edate, selectedSubject);
    console.log("reached the backend")
    const username="Aditya ";

    async function getFilteredRecords(username, sdate, edate, selectedSubjects) {
        try {
            const records = await Record.aggregate([
                // Match documents with the specified username, date range, subjects, and excluding "No" status
                {
                    $match: {
                        username: username,
                        status: { $ne: "No" },
                        date: {
                            $gte: sdate, // Direct string comparison
                            $lte: edate  // Direct string comparison
                        },
                        subject: { $in: selectedSubjects }
                    }
                },
                
                // Group by subject
                {
                    $group: {
                        _id: "$subject", // Group by subject
                        records: {
                            $push: {
                                date: "$date",
                                credit: "$credit",
                                professor: "$professor",
                                time: "$time",
                                venue: "$venue",
                                status: "$status"
                            }
                        }
                    }
                },
    
                // Optionally sort each subject's records by date in descending order
                {
                    $sort: { "records.date": -1 }
                },
    
                // Rename fields to match the desired output structure
                {
                    $project: {
                        _id: 0,
                        subject: "$_id",
                        records: 1
                    }
                }
            ]);
    
            console.log(records);
            return res.json({
                rec:records
            });
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    await getFilteredRecords(username, sdate, edate, selectedSubject);


})
app.get("/signin/check-username", async (req, res) => {
    const username = req.query.username; // Accessing the query parameter
    console.log("Request received at /signin/check-username");

    try {
        const existingUser = await UsersCred.findOne({ username: username });
        if (existingUser) {
            res.json({ isUnique: false });
        } else {
            res.json({ isUnique: true });
        }
    } catch (error) {
        console.error("Error checking username:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


app.post('/signin/submit', async (req, res) => {
    try {
      const { username, dailyRecords } = req.body;
      console.log(dailyRecords);
  
      // Create a user document to insert
      const user = new Users({
        username: username,
        DailyRecords: dailyRecords
      });

      const result = await user.save(); 
  
      // Respond with success
      res.status(200).json({ message: 'Record inserted successfully', data: result });
    } catch (error) {
      console.error('Error inserting record:', error);
      res.status(500).json({ message: 'Error inserting record', error: error.message });
    }
  });

app.post("/signin/Credentials", async (req, res) => {
    try{
    const {username,password} = req.body; // Accessing the query parameter
  
    // Example logic to check if the username is unique
    // here i will have to check with the User_schema data base
    const hashedPassword = await bcrypt.hash(password, 8)
    console.log(password);
    console.log(hashedPassword);

    const Cred= new UsersCred({
        username:username,
        password:hashedPassword
    });
    const result = await Cred.save();
    res.status(200).json({ message: 'Record inserted successfully', data: result,
        Ok:"true"
     });

    }
    catch (error){
        console.error('Error inserting record:', error);
        res.status(500).json({ message: 'Error inserting record', error: error.message,ok:"false" });

    }
  });  

app.get("/signup", async (req, res) => {
    const {username,password} = req.query.username; // Accessing the query parameter

    const existingUser= await UsersCred.findOne({
        username:username
    });

    if (existingUser) {
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch){
            return res.status(401);
        }
        else{
            // a valid user. now apply the jwt concept to store the token.
            var token= jwt.sign({username:username},process.env.JWT_KEY);
            return res.status(200).json({ 
                token:token
             });
        }
      
    } else {
        // no user found actually.
      res.status(400);
    }
  });

//   the routes for fetching the schedule of the days
app.get("/schedule/today", async(req,res)=>{
    const username = "Aditya ";  
    const dayOfWeek = "Wednesday";  
    console.log("reached thed backend")

try{const pipeline = [
  {
    $match: {
      username: username
    }
  },
  {
    $unwind: "$DailyRecords"
  },
  {
    $match: {
      "DailyRecords.day": dayOfWeek
    }
  },
  {
    $project: {
      _id: 0,
      schedule: "$DailyRecords.Schedule"
    }
  },
  {
    $unwind: "$schedule"
  },
  {
    $project: {
      subject: "$schedule.subject",
      professor: "$schedule.professor",
      credit: "$schedule.credit",
      venue: "$schedule.venue",
      time: "$schedule.time",
      status: "$schedule.status"
    }
  }
];

// Execute the aggregation pipeline
let result = await Users.aggregate(pipeline);
console.log("the output fetched is : ", result);
return res.status(200).json({
    result:result
});
}
catch(error){
    console.error("Some error in the fecthing the today records",error);
    return res.status(400);

}
});

app.get("/schedule/Yesterday", async(req,res)=>{
    const username = "Aditya ";  
    const dayOfWeek = req.query.day; 

try{const pipeline = [
  {
    $match: {
      username: username
    }
  },
  {
    $unwind: "$DailyRecords"
  },
  {
    $match: {
      "DailyRecords.day": dayOfWeek
    }
  },
  {
    $project: {
      _id: 0,
      schedule: "$DailyRecords.Schedule"
    }
  },
  {
    $unwind: "$schedule"
  },
  {
    $project: {
      subject: "$schedule.subject",
      professor: "$schedule.professor",
      credit: "$schedule.credit",
      venue: "$schedule.venue",
      time: "$schedule.time",
      status: "$schedule.status"
    }
  }
];

// Execute the aggregation pipeline
let result = await Users.aggregate(pipeline);
console.log("the output fetched is : ", result);
console.log(result);
return res.status(200).json({
    result:result
});
}
catch(error){
    console.error("Some error in the fecthing the today records",error);
    return res.status(400);

}
});

app.get("/schedule/Tomorrow", async(req,res)=>{
    const username = "Aditya ";  
    const dayOfWeek = req.query.day;  

try{const pipeline = [
  {
    $match: {
      username: username
    }
  },
  {
    $unwind: "$DailyRecords"
  },
  {
    $match: {
      "DailyRecords.day": dayOfWeek
    }
  },
  {
    $project: {
      _id: 0,
      schedule: "$DailyRecords.Schedule"
    }
  },
  {
    $unwind: "$schedule"
  },
  {
    $project: {
      subject: "$schedule.subject",
      professor: "$schedule.professor",
      credit: "$schedule.credit",
      venue: "$schedule.venue",
      time: "$schedule.time",
      status: "$schedule.status"
    }
  }
];

// Execute the aggregation pipeline
let result = await Users.aggregate(pipeline);
console.log("the output fetched is : ", result);
return res.status(200).json({
    result:result
});
}
catch(error){
    console.error("Some error in the fecthing the today records",error);
    return res.status(400);

}
});

app.post('/dashboard/submit', async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);
    console.log("reached here in dashboard submit the record");
    const result = await Record.create(formData)

    // Respond with success
    res.status(200).json({ message: 'Record inserted successfully', data: result });
  } catch (error) {
    console.error('Error inserting record:', error);
    res.status(500).json({ message: 'Error inserting record', error: error.message });
  }
});

app.listen(8080,()=>{
    console.log("listening at port : 8080");
})
