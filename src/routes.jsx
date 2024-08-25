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
    await getRecordsByUsername();


})


app.listen('3000',()=>{
    console.log("listening at port : 3000");
})