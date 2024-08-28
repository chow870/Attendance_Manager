const mongoose = require('mongoose');



  const Schedule_schema=new mongoose.Schema({
    subject: {
        type: String,
        default: "", 
    },
    professor: {
        type: String,
        default: "", 
    },
    credit: {
        type:Number,
    },
    
    venue:{
        type:String,
    },
    time:{  // when is the class.
        type:String,
    },
    status:{
        type:String,
        default:"NULL",
    }

  });

  const DailyRecords_schema= new mongoose.Schema({
        day:{
            type:String,
        },
        
        Schedule:[Schedule_schema]
       
  });

const UserSchema = new mongoose.Schema({  // this is what it will be stored on the submission.
    username: {
      type: String,
      required: true,
    },
    // email
    DailyRecords:[DailyRecords_schema],         
  });

const Users = mongoose.model('Users', UserSchema);
module.exports = Users;