// single route page.
import express from 'express';
import mongoose from 'mongoose';
const Record=require('./Model/Records_Model');
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());

app.use(bodyParser.json());


const app = express();
mongoose.connect(process.env.MONGODB_KEY,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });




app.get("/dashboard/allrecords",async (req,res)=>{
    // here i am supposed to give all the records, grouped by the "date" and hide the username, sort in decreasing fashion by date
    // you have to give the username for this purpose.
    let username="Aditya Choudhary";
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
    let username="Aditya Choudhary";
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


app.listen('3000',()=>{
    console.log("listening at port : 3000");
})